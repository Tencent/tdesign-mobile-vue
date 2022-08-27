<template>
  <t-overlay :class="`${prefix}-image-viewer`" :visible="visible">
    <template v-if="lazyVisible">
      <div :class="`${name}__close-icon`" @click="handleClose($event, 'close-btn')">
        <t-node v-if="!(typeof closeBtnTNode === 'boolean')" :content="closeBtnTNode"></t-node>
        <close-circle-filled-icon v-else-if="typeof closeBtn === 'boolean' && closeBtn" />
      </div>
      <t-swiper
        :autoplay="false"
        :class="`${name}__swipe`"
        :default-current="initialIndex"
        :navigation="navigation"
        :on-change="onSwiperChange"
      >
        <t-swiper-item
          v-for="(image, index) in images"
          :key="image + index"
          :class="`${name}__swipe-item`"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <img :src="image" :style="imageStyle" :class="`${name}__image`" />
        </t-swiper-item>
      </t-swiper>
    </template>
  </t-overlay>
</template>

<script lang="ts">
import {
  computed,
  toRefs,
  ref,
  defineComponent,
  reactive,
  watch,
  getCurrentInstance,
  CSSProperties,
  SetupContext,
} from 'vue';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import ImageViewerProps from './props';
import { renderTNode, TNode, useEmitEvent, useDefault, useTouch } from '../shared';
import { TdImageViewerProps } from './type';
import TOverlay from '../overlay';
import { Swiper as TSwiper, SwiperItem as TSwiperItem, SwiperNavigation } from '../swiper';

export type TriggerType = 'close-btn' | 'overlay' | 'esc';
const { prefix } = config;
const name = `${prefix}-image-viewer`;

/*
initialIndex, 因 swiper 不支持 defaultCurrent


onIndexChange, 因 swiper 未提供 'prev' | 'next'， 所以没有 context
*/
const getDistance = (touches: TouchList) =>
  Math.sqrt((touches[0].clientX - touches[1].clientX) ** 2 + (touches[0].clientY - touches[1].clientY) ** 2);

export default defineComponent({
  name,
  components: {
    CloseCircleFilledIcon,
    TSwiper,
    TSwiperItem,
    TOverlay,
    TNode,
  },
  props: ImageViewerProps,
  emits: ['close', 'index-change', 'update:visible', 'update:modelValue', 'change'],
  setup(props, context: SetupContext) {
    const state = reactive({
      zooming: false,
      scale: 1,
    });
    const emitEvent = useEmitEvent(props, context.emit);
    const [visible, setVisible] = useDefault<TdImageViewerProps['visible'], TdImageViewerProps>(
      props,
      context.emit,
      'visible',
      'change',
    );
    // 因 Overlay 未提供lazy属性，先暂时自行实现
    const lazyVisible = ref(visible.value);
    const touch = useTouch();
    const internalInstance = getCurrentInstance();
    const closeBtnTNode = computed(() => {
      return renderTNode(internalInstance, 'closeBtn');
    });
    const navigation = computed<SwiperNavigation>(() => {
      if (props.showIndex) {
        return { type: 'fraction' };
      }
      return { type: 'dots', showSlideBtn: false };
    });

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

    const handleClose = (e: Event, trigger: TriggerType) => {
      setVisible(false);
      emitEvent('close', { trigger, e });
    };

    const onSwiperChange = (index: number, context: any) => {
      emitEvent('index-change', index);
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

    watch(
      () => visible.value,
      (value) => {
        if (!value) {
          resetScale();
        }
        setTimeout(() => {
          lazyVisible.value = value;
        }, 300);
      },
    );
    return {
      name,
      prefix,
      closeBtnTNode,
      navigation,
      imageStyle,
      lazyVisible,
      ...toRefs(props),
      visible,
      handleClose,
      onSwiperChange,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };
  },
});
</script>
