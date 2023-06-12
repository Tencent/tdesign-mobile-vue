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
      <t-swiper :autoplay="false" :class="`${name}__content`" :current="currentIndex" @change="onSwiperChange">
        <t-swiper-item
          v-for="(image, index) in images"
          :key="index"
          :class="`${name}__swiper-item`"
          :style="{ height: swiperStyle[index] }"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <t-image :src="image" :style="imageStyle" @load="onImageLoadSuccess" />
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
import { renderTNode, TNode, useEmitEvent, useDefault, useTouch } from '../shared';
import { TdImageViewerProps } from './type';

// inner components
import { Swiper as TSwiper, SwiperItem as TSwiperItem } from '../swiper';
import TImage from '../image';

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
  emits: ['close', 'index-change', 'update:visible', 'update:modelValue', 'change'],
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const state = reactive({
      zooming: false,
      scale: 1,
      swiperStyle: [] as string[],
    });
    const emitEvent = useEmitEvent(props, context.emit);
    const [visible, setVisible] = useDefault(props, context.emit, 'visible', 'change');
    const [currentIndex, setIndex] = useDefault<TdImageViewerProps['index'], TdImageViewerProps>(
      props,
      context.emit,
      'index',
      'index-change',
    );
    const touch = useTouch();

    // node
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

    const imageStyle = computed(() => {
      const { scale, zooming } = state;
      const style: CSSProperties = {
        transitionDuration: zooming ? '0s' : '.3s',
      };

      if (scale !== 1) {
        style.transform = `scale(${scale}, ${scale})`;
      }

      return style;
    });

    const calcImageDisplayStyle = (imageWidth: number, imageHeight: number) => {
      const { height, width } = window.screen;
      const ratio = imageWidth / imageHeight;
      // 图片宽高都小于屏幕宽高
      if (imageWidth < width && imageHeight < height) {
        return {
          styleObj: {
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        };
      }
      // 图片宽高至少存在一个大于屏幕宽高，此时判断图片宽高比，按长边显示
      if (ratio >= 1) {
        return {
          styleObj: {
            width: '100vw',
            height: `${width / ratio}px`,
          },
        };
      }
      return {
        styleObj: {
          width: `${ratio * width}px`,
          height: '100vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    };

    const onImageLoadSuccess = (e: any) => {
      const { clientHeight, clientWidth } = e.target as HTMLElement;
      const { styleObj } = calcImageDisplayStyle(clientHeight, clientWidth);
      state.swiperStyle.push(`${styleObj.height}`);
    };

    const handleClose = (e: Event, trigger: string) => {
      setVisible(false);
      emitEvent('close', { trigger, e });
    };

    const handleDelete = () => {
      emitEvent('delete', currentIndex);
    };

    const onSwiperChange = (index: number, context: any) => {
      setIndex(index, { context });
    };

    let fingerNum: number;
    let startScale: number;
    let startDistance: number;
    let doubleTapTimer: number | null;
    let touchStartTime: number;
    const onTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const { touches } = event;

      touch.start(event);

      fingerNum = touches.length;
      touchStartTime = Date.now();
      state.zooming = fingerNum === 2;
      if (state.zooming) {
        startScale = state.scale;
        startDistance = getDistance(event.touches);
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      const { touches } = event;

      touch.move(event);
      event.preventDefault();
      event.stopPropagation();
      if (state.zooming) {
        event.preventDefault();
        event.stopPropagation();
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
      event.preventDefault();

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
      imageStyle,
      visible,
      onImageLoadSuccess,
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
