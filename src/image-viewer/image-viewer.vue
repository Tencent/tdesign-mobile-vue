<template>
  <transition name="fade">
    <div v-if="visible" :ref="(el) => (rootRef = el)" :class="`${prefix}-image-viewer`">
      <div :class="`${name}__mask`" @click="handleClose($event, 'overlay')" />
      <t-swiper
        :autoplay="false"
        :class="`${name}__content`"
        height="100vh"
        :default-current="currentIndex"
        :disabled="disabled"
        @change="onSwiperChange"
      >
        <t-swiper-item
          v-for="(image, index) in images"
          :key="index"
          :class="`${name}__swiper-item`"
          @touchstart="onTouchStart($event, index)"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <t-image
            :src="image"
            :style="`${imageTransitionDuration}; ${index === touchIndex ? `transform: ${imageTransform}` : ''}`"
            :on-load="({ e }) => onLoad(e, index)"
          />
        </t-swiper-item>
      </t-swiper>
      <div :class="`${name}__nav`">
        <div v-if="closeNode" :class="`${name}__nav-close`" @click="handleClose($event, 'close-btn')">
          <t-node :content="closeNode" />
        </div>

        <div v-if="showIndex" :class="`${name}__nav-index`">{{ (currentIndex ?? 0) + 1 }}/{{ images?.length }}</div>

        <div v-if="deleteNode" :class="`${name}__nav-delete`" @click="handleDelete">
          <t-node :content="deleteNode" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, getCurrentInstance, h, Transition, toRefs, ref, watch } from 'vue';
import { CloseIcon, DeleteIcon } from 'tdesign-icons-vue-next';

import config from '../config';
import ImagediverProps from './props';
import { renderTNode, TNode, useDefault, useTouch } from '../shared';
import { preventDefault } from '../shared/dom';

// inner components
import { Swiper as TSwiper, SwiperItem as TSwiperItem } from '../swiper';
import TImage from '../image';
import { TdImageViewerProps } from './type';

const { prefix } = config;
const name = `${prefix}-image-viewer`;

const getDistance = (touches: TouchList) =>
  Math.sqrt((touches[0].clientX - touches[1].clientX) ** 2 + (touches[0].clientY - touches[1].clientY) ** 2);

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
      zooming: false,
      scale: 1,
      touchIndex: 0,
      swiperStyle: [] as string[],

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
    const touch = useTouch();

    const disabled = ref(false);
    const rootRef = ref();
    const imagesSize = reactive({});

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
      state.zooming = false;
      state.scale = 1;
      state.dragging = false;
      state.draggedX = 0;
      state.draggedY = 0;
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

    const onLoad = (e: Event, index: number) => {
      const { height } = e.target as HTMLImageElement;
      imagesSize[index] = { height };
    };

    const maxDraggedX = computed(() => {
      const rootOffsetWidth = rootRef.value?.offsetWidth || 0;
      const scaledWidth = state.scale * rootOffsetWidth;
      return Math.max(0, (scaledWidth - rootOffsetWidth) / 2);
    });

    const maxDraggedY = computed(() => {
      const rootOffsetHeight = rootRef.value?.offsetHeight || 0;
      const currentImageScaledHeight = state.scale * (imagesSize?.[currentIndex.value]?.height || 0);
      if (currentImageScaledHeight <= rootOffsetHeight) return 0;
      return Math.max(0, (currentImageScaledHeight - rootOffsetHeight) / 2);
    });

    let fingerNum: number;
    let startScale: number;
    let startDistance: number;
    let doubleTapTimer: number | null;
    let touchStartTime: number;
    let startDraggedX: number;
    let startDraggedY: number;
    let isDragged = false;

    const onTouchStart = (event: TouchEvent, index: number) => {
      preventDefault(event, true);
      const { touches } = event;

      touch.start(event);

      fingerNum = touches.length;
      touchStartTime = Date.now();
      startDraggedX = state.draggedX;
      startDraggedY = state.draggedY;

      state.dragging = fingerNum === 1;
      state.zooming = fingerNum === 2;
      state.touchIndex = index;

      if (state.zooming) {
        startScale = state.scale;
        startDistance = getDistance(event.touches);
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      const { touches } = event;

      touch.move(event);
      if (state.zooming) {
        preventDefault(event, true);
        if (touches.length === 2) {
          const distance = getDistance(touches);
          const scale = (startScale * distance) / startDistance;

          setScale(scale);
        }
      }

      if (state.dragging) {
        const { deltaX, deltaY, isHorizontal } = touch;
        const draggedX = deltaX.value + startDraggedX;
        const draggedY = deltaY.value + startDraggedY;
        state.extraDraggedX = draggedX;
        if ((draggedX > maxDraggedX.value || draggedX < -maxDraggedX.value) && !isDragged && isHorizontal()) {
          state.dragging = false;
          return;
        }

        isDragged = true;
        preventDefault(event, true);
        state.draggedX = Math.min(Math.max(draggedX, -maxDraggedX.value), maxDraggedX.value);
        state.draggedY = Math.min(Math.max(draggedY, -maxDraggedY.value), maxDraggedY.value);
      }
    };

    const setScale = (scale: number) => {
      scale = Math.min(scale, +props.maxZoom + 1);

      if (scale !== state.scale) {
        state.scale = scale;
        state.draggedX = 0;
        state.draggedY = 0;
      }
    };
    const resetScale = () => {
      setScale(1);
    };

    const toggleScale = () => {
      const scale = state.scale > 1 ? 1 : 2;

      setScale(scale);
    };

    const checkTap = (event: Event) => {
      if (fingerNum > 1) {
        return;
      }

      // resetScale();

      const { offsetX, offsetY } = touch;
      const deltaTime = Date.now() - touchStartTime;
      const TAP_TIME = 250;
      const TAP_OFFSET = 5;

      if (offsetX.value < TAP_OFFSET && offsetY.value < TAP_OFFSET && deltaTime < TAP_TIME) {
        if (doubleTapTimer) {
          clearTimeout(doubleTapTimer);
          doubleTapTimer = null;
          toggleScale();
        } else {
          doubleTapTimer = window.setTimeout(() => {
            handleClose(event, 'overlay');
            doubleTapTimer = null;
          }, TAP_TIME);
        }
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      let stopPropagation = false;

      if (state.zooming || state.dragging) {
        stopPropagation = true;

        if (state.dragging && startDraggedX === state.draggedX && startDraggedY === state.draggedY) {
          stopPropagation = false;
        }

        if (!event.touches.length) {
          if (state.zooming) {
            state.draggedX = Math.min(Math.max(state.draggedX, -maxDraggedX.value), maxDraggedX.value);
            state.draggedY = Math.min(Math.max(state.draggedY, -maxDraggedY.value), maxDraggedY.value);
            state.zooming = false;
          }

          state.dragging = false;
          startDraggedX = 0;
          startDraggedY = 0;
          startScale = 1;

          startScale = 1;
          if (state.scale < 1) {
            resetScale();
          }
          if (state.scale > props.maxZoom) {
            state.scale = +props.maxZoom;
          }
        }
      }

      // eliminate tap delay on safari
      preventDefault(event, stopPropagation);

      checkTap(event);
      touch.reset();
    };

    watch(
      () => state.scale,
      (newVal) => {
        if (newVal !== 1) {
          disabled.value = true;
        } else {
          disabled.value = false;
        }
      },
    );

    watch(
      () => state.extraDraggedX,
      (newVal) => {
        if (newVal > maxDraggedX.value || newVal < -maxDraggedX.value) {
          disabled.value = false;
        } else {
          disabled.value = true;
        }
      },
    );

    return {
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
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onLoad,
    };
  },
});
</script>
