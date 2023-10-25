<template>
  <transition name="fade">
    <div v-if="visible" :ref="(el) => (rootRef = el)" :class="`${prefix}-image-viewer`">
      <div :class="`${name}__mask`" @click="handleClose($event, 'overlay')" />
      <t-swiper
        ref="swiperRootRef"
        :autoplay="false"
        :class="`${name}__content`"
        height="100vh"
        :default-current="currentIndex"
        :disabled="disabled"
        @change="onSwiperChange"
      >
        <t-swiper-item
          v-for="(image, index) in images"
          ref="swiperItemRefs"
          :key="index"
          :class="`${name}__swiper-item`"
          style="touch-action: none"
        >
          <t-image
            :src="image"
            :style="`${imageTransitionDuration}; ${
              index === touchIndex ? `transform: ${imageTransform}` : 'transform: matrix(1, 0, 0, 1, 0, 0)'
            }`"
            :on-load="({ e }) => onImgLoad(e, index)"
            @transitionend.self="onTransitionEnd(index)"
            @transitionstart.self="onTransitionStart(index)"
          />
        </t-swiper-item>
      </t-swiper>
      <div :class="`${name}__nav`">
        <div v-if="closeNode" :class="`${name}__nav-close`" @click="handleClose($event, 'close-btn')">
          <t-node :content="closeNode" />
        </div>

        <div v-if="showIndex" :class="`${name}__nav-index`">
          {{ Math.min((currentIndex ?? 0) + 1, images?.length) }}/{{ images?.length }}
        </div>

        <div v-if="deleteNode" :class="`${name}__nav-delete`" @click="handleDelete">
          <t-node :content="deleteNode" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  getCurrentInstance,
  h,
  Transition,
  toRefs,
  ref,
  watch,
  nextTick,
  onUnmounted,
} from 'vue';
import { CloseIcon, DeleteIcon } from 'tdesign-icons-vue-next';

import config from '../config';
import ImagediverProps from './props';
import { renderTNode, TNode, useDefault, inBrowser, useGesture, DragState, PinchState } from '../shared';

// inner components
import { Swiper as TSwiper, SwiperItem as TSwiperItem } from '../swiper';
import TImage from '../image';
import { TdImageViewerProps } from './type';

const { prefix } = config;
const name = `${prefix}-image-viewer`;

const TAP_TIME = 300;

export default defineComponent({
  name,
  components: {
    Transition,
    TSwiper,
    TSwiperItem,
    TNode,
    TImage,
  },
  props: ImagediverProps,
  emits: ['close', 'index-change', 'update:visible', 'update:modelValue', 'update:index', 'delete'],
  setup(props, { emit }) {
    const internalInstance = getCurrentInstance();
    const state = reactive({
      dblTapZooming: false, // double tap zooming
      zooming: false, // pinch zooming
      scale: 1,
      touchIndex: 0,
      dragging: false,
      draggedX: 0,
      draggedY: 0,
      extraDraggedX: 0,
    });
    const [visible, setVisible] = useDefault(props, emit, 'visible', 'change');
    const [currentIndex, setIndex] = useDefault<TdImageViewerProps['index'], TdImageViewerProps>(
      props,
      emit,
      'index',
      'index-change',
    );

    const disabled = ref(false);
    const rootRef = ref();
    const imagesSize = reactive({});
    const swiperRootRef = ref();
    const swiperItemRefs = ref();
    const gestureRef = ref();

    const closeNode = computed(() =>
      renderTNode(internalInstance, 'close-btn', {
        defaultNode: h(CloseIcon),
      }),
    );
    const deleteNode = computed(() =>
      renderTNode(internalInstance, 'delete-btn', {
        defaultNode: h(DeleteIcon),
      }),
    );

    const imageTransform = computed(() => {
      const { scale, draggedX, draggedY } = state;
      return `matrix(${scale}, 0, 0, ${scale}, ${draggedX}, ${draggedY})`;
    });

    const imageTransitionDuration = computed(() => {
      const { zooming, dragging } = state;
      return zooming || dragging ? 'transition-duration: 0s' : 'transition-duration: 0.3s';
    });

    const beforeClose = () => {
      state.dblTapZooming = false;
      state.zooming = false;
      state.scale = 1;
      state.dragging = false;
      state.draggedX = 0;
      state.draggedY = 0;
      state.extraDraggedX = 0;
    };

    const handleClose = (e: Event, trigger: string) => {
      beforeClose();
      setVisible(false);
      emit('close', { trigger, e });
    };

    const handleDelete = () => {
      emit('delete', currentIndex.value ?? 0);
    };

    const onSwiperChange = (index: number, context: any) => {
      if (currentIndex.value !== index) {
        setIndex(index, { context });
        setScale(1);
      }
    };

    const onImgLoad = (e: Event, index: number) => {
      const { height } = e.target as HTMLImageElement;
      imagesSize[index] = { height };
    };

    const getMaxDraggedX = () => {
      const rootOffsetWidth = rootRef.value?.offsetWidth || 0;
      const scaledWidth = state.scale * rootOffsetWidth;
      return Math.max(0, (scaledWidth - rootOffsetWidth) / 2);
    };

    const getMaxDraggedY = (index: number) => {
      const rootOffsetHeight = rootRef.value?.offsetHeight || 0;
      const currentImageScaledHeight = state.scale * (imagesSize?.[index]?.height || 0);
      if (currentImageScaledHeight <= rootOffsetHeight) return 0;
      return Math.max(0, (currentImageScaledHeight - rootOffsetHeight) / 2);
    };

    const setScale = (scale: number) => {
      scale = Math.min(scale, +props.maxZoom + 1);
      if (scale !== state.scale) {
        state.scale = scale;

        if (scale === 1) {
          state.draggedX = 0;
          state.draggedY = 0;
        }
      }
    };

    let dragStartTime: number;
    let dblTapTimer: number | null;

    const toggleScale = () => {
      const scale = state.scale > 1 ? 1 : 2;
      setScale(scale);
    };

    const onTransitionEnd = (index: number) => {
      if (index === state.touchIndex) {
        state.dblTapZooming = false;
        clearTimeout(dblTapTimer);
        dblTapTimer = null;
      }
    };

    const onTransitionStart = (index: number) => {
      if (index === state.touchIndex) {
        state.dblTapZooming = true;
        clearTimeout(dblTapTimer);
      }
    };

    const checkTap = (e: DragState) => {
      const { event } = e;
      const deltaTime = Date.now() - dragStartTime;
      if (deltaTime < TAP_TIME && inBrowser) {
        if (dblTapTimer) {
          clearTimeout(dblTapTimer);
          dblTapTimer = window.setTimeout(() => {
            clearTimeout(dblTapTimer);
            state.dragging = false;
            toggleScale();
          }, TAP_TIME);
        } else {
          dblTapTimer = window.setTimeout(() => {
            handleClose(event, 'overlay');
            dblTapTimer = null;
          }, TAP_TIME);
        }
      }
    };

    const onPinchChange = (scale: number, index: number) => {
      state.zooming = true;
      state.touchIndex = index;
      setScale(scale);
    };

    const onPinchEnd = () => {
      state.zooming = false;
      if (state.scale < 1) {
        setScale(1);
      }
      if (state.scale > props.maxZoom) {
        state.scale = +props.maxZoom;
      }
    };

    const handlePinch = (pinState: PinchState, index: number) => {
      const {
        last,
        offset: [d],
      } = pinState;
      // 图片未加载完毕，禁止拖拽
      if (!imagesSize?.[index]) return;
      if (state.dblTapZooming) return;
      if (!last) {
        onPinchChange(d, index);
      } else {
        onPinchEnd();
      }
    };

    const handleDrag = (dragState: DragState, index: number) => {
      state.touchIndex = index;
      const { setOffset } = swiperRootRef.value || {};

      // 图片未加载完毕，禁止拖拽
      if (!imagesSize?.[index]) return;
      const { first, movement, _movement, elapsedTime, tap, offset, overflow, _delta } = dragState;
      if (first) {
        dragStartTime = Date.now();
      }

      if (tap && elapsedTime > 0 && elapsedTime < 300) {
        checkTap(dragState);
        return;
      }

      // 双击缩放时取消拖拽事件
      if (state.dblTapZooming) {
        dragState?.cancel();
        return;
      }

      state.dragging = true;

      // 过高图片允许上下滑动
      state.draggedY = offset?.[1] || 0;

      if (state.scale === 1) return;

      state.draggedX = offset?.[0] || 0;

      if (movement[0] !== _movement[0] && overflow[0] !== 0) {
        state.extraDraggedX += _delta[0] / 5;
        setOffset?.(state.extraDraggedX, 'X');
      } else if (state.extraDraggedX !== 0) {
        state.extraDraggedX = 0;
        setOffset?.(state.extraDraggedX, 'X');
      }
    };

    const handleDragEnd = (dragState: DragState) => {
      const { overflow, last } = dragState;
      const { goPrev, goNext, swiperContainer } = swiperRootRef.value || {};

      state.dragging = false;

      if (state.extraDraggedX !== 0 && last) {
        if (Math.abs(state.extraDraggedX) > 50) {
          state.extraDraggedX = 0;
          overflow[0] < 0 ? goNext?.('touch') : goPrev?.('touch');
          return;
        }
        state.extraDraggedX = 0;
        nextTick(() => {
          swiperContainer?.style?.setProperty?.('transform', 'translateX(0)');
          swiperContainer?.style?.setProperty?.('transition', 'transform 0.3s');
        });
      }
    };

    const gestureOptions = reactive({
      destroyInvisible: true,
      visible: !!visible.value,
    });

    gestureRef.value = useGesture(gestureOptions);

    watch(
      () => visible.value,
      (newVal) => (gestureOptions.visible = !!newVal),
    );

    watch(
      () => [visible.value, swiperItemRefs.value],
      ([newVisible, newRefs]) => {
        if (!newVisible) return;
        nextTick(() => {
          newRefs?.forEach?.((item: any, index: number) => {
            const { $el } = item;
            gestureRef.value?.create(
              $el as Element,
              {
                onDrag: (dragState: DragState) => handleDrag(dragState, index),
                onDragEnd: (dragState: DragState) => handleDragEnd(dragState),
                onPinch: (pinchState: PinchState) => handlePinch(pinchState, index),
              },
              {
                drag: {
                  from: () => [state.draggedX, state.draggedY],
                  pointer: { touch: true },
                  bounds: () => ({
                    top: -getMaxDraggedY(index),
                    right: getMaxDraggedX(),
                    bottom: getMaxDraggedY(index),
                    left: -getMaxDraggedX(),
                  }),
                },
                pinch: {
                  from: () => [state.scale, 0],
                  pointer: { touch: true },
                },
              },
            );
          });
        });
      },
    );

    watch(
      () => state.scale,
      (newVal) => (disabled.value = newVal !== 1),
    );

    onUnmounted(() => {
      clearTimeout(dblTapTimer);
    });

    return {
      swiperRootRef,
      swiperItemRefs,
      rootRef,
      disabled,
      name,
      ...toRefs(state),
      prefix,
      closeNode,
      deleteNode,
      currentIndex,
      imageTransform,
      imageTransitionDuration,
      visible,
      handleClose,
      handleDelete,
      onSwiperChange,
      onImgLoad,
      onTransitionEnd,
      onTransitionStart,
    };
  },
});
</script>
