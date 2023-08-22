<template>
  <transition name="fade">
    <div v-if="visible" :class="`${prefix}-image-viewer`">
      <div :class="`${name}__mask`" @click="handleClose($event, 'overlay')" />
      <div :class="`${name}__nav`">
        <div v-if="closeNode" :class="`${name}__nav-close`" @click="handleClose($event, 'close-btn')">
          <t-node :content="closeNode" />
        </div>

        <div v-if="showIndex" :class="`${name}__nav-index`">{{ (currentIndex ?? 0) + 1 }}/{{ images?.length }}</div>

        <div v-if="deleteNode" :class="`${name}__nav-delete`" @click="handleDelete">
          <t-node :content="deleteNode" />
        </div>
      </div>
      <t-swiper
        :autoplay="false"
        :class="`${name}__content`"
        height="100vh"
        :default-current="currentIndex"
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
          />
        </t-swiper-item>
      </t-swiper>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, getCurrentInstance, CSSProperties, h, Transition, toRefs } from 'vue';
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
    });
    const [visible, setVisible] = useDefault(props, emit, 'visible', 'change');
    const [currentIndex, setIndex] = useDefault<TdImageViewerProps['index'], TdImageViewerProps>(
      props,
      emit,
      'index',
      'index-change',
    );
    const touch = useTouch();
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
      const { scale } = state;
      return `scale(${scale}, ${scale})`;
    });

    const imageTransitionDuration = computed(() => {
      const { zooming } = state;
      return zooming ? 'transition-duration: 0s' : 'transition-duration: 0.3s';
    });

    const handleClose = (e: Event, trigger: string) => {
      setVisible(false);
      emit('close', { trigger, e });
    };

    const handleDelete = () => {
      emit('delete', currentIndex.value ?? 0);
    };

    const onSwiperChange = (index: number, context: any) => {
      setIndex(index, { context });
    };

    let fingerNum: number;
    let startScale: number;
    let startDistance: number;
    let doubleTapTimer: number | null;
    let touchStartTime: number;
    const onTouchStart = (event: TouchEvent, index: number) => {
      preventDefault(event, true);
      const { touches } = event;

      touch.start(event);

      fingerNum = touches.length;
      touchStartTime = Date.now();
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
      preventDefault(event, true);
      if (state.zooming) {
        preventDefault(event, true);
      }
      if (state.zooming && touches.length === 2) {
        const distance = getDistance(touches);
        const scale = (startScale * distance) / startDistance;

        setScale(scale);
      }
    };

    const setScale = (scale: number) => {
      scale = Math.min(scale, +props.maxZoom + 1);

      if (scale !== state.scale) {
        state.scale = scale;
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

      resetScale();

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
      // eliminate tap delay on safari
      preventDefault(event, false);
      if (state.zooming) {
        event.stopPropagation();
        if (!event.touches.length) {
          if (state.zooming) {
            state.zooming = false;
          }
          startScale = 1;
          if (state.scale < 1) {
            resetScale();
          }
          if (state.scale > props.maxZoom) {
            state.scale = +props.maxZoom;
          }
        }
      }

      checkTap(event);
      touch.reset();
    };

    return {
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
    };
  },
});
</script>
