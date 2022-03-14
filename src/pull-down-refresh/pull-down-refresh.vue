<template>
  <div :class="name">
    <div
      :class="`${name}__track`"
      :style="trackStyle"
      @touchstart.stop="onTouchStart"
      @touchmove.stop="onTouchMove"
      @touchend.stop="onTouchEnd"
      @touchcancel.stop="onTouchEnd"
    >
      <div :class="`${name}__tips`" :style="tipsStyles">
        <div v-if="state.status === 'loading'">
          <t-loading :text="loadingText" :class="`${name}__loading-icon`" v-bind="loadingIconProps" />
        </div>
        <div v-else>{{ loadingText }}</div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, ref, computed, SetupContext, watch, onMounted } from 'vue';
import PullDownRefreshProps from './props';
import { useEmitEvent, renderTNode, TNode } from '../shared';
import config from '../config';
import TLoading from '../loading';

const { prefix } = config;
const name = `${prefix}-pull-down-refresh`;
type PullRefreshStatus = 'normal' | 'loading' | 'loosing' | 'pulling' | 'success';

function useTouch() {
  const startY = ref(0);
  const deltaY = ref(0);

  const start = (event: TouchEvent) => {
    startY.value = event.touches[0].clientY;
    deltaY.value = 0;
  };
  const move = (event: TouchEvent) => {
    const touch = event.touches[0];
    deltaY.value = touch.clientY - startY.value;
  };
  return {
    startY,
    deltaY,
    start,
    move,
  };
}

const PULL_DISTANCE = 50;
const ANIMATION_DURATION = 300;

// 缓动函数
const easeDistance = (distance: number, pullDistance: number) => {
  if (distance > pullDistance) {
    if (distance < pullDistance * 2) {
      distance = pullDistance + (distance - pullDistance) / 2;
    } else {
      distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
    }
  }
  return Math.round(distance);
};

function isElement(node: Element) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
}

const getScrollParent = (node: Element) => {
  let res = node;
  while (res && isElement(res)) {
    if (/auto|scroll/i.test(window.getComputedStyle(res).overflowY)) {
      return res;
    }
    res = res.parentNode as Element;
  }
};

export default defineComponent({
  name,
  components: { TLoading },
  props: PullDownRefreshProps,
  emits: ['refresh', 'timeout', 'update:modelValue'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);

    // 动态生成style
    const trackStyle = computed(() => ({
      transitionDuration: `${state.duration}ms`,
      transform: state.distance ? `translate3d(0, ${state.distance}px, 0)` : '',
    }));

    const tipsStyles = computed(() => ({
      height: `${props.loadingBarHeight}px`,
    }));

    // 动态生成loadingIcon的props
    const loadingIconProps = computed(() => ({ ...props.loadingProps }));

    // 初始化状态和滑动距离，动态调整state
    const state = reactive({
      status: 'normal' as PullRefreshStatus,
      distance: 0,
      duration: 0,
    });

    const setStatus = (distance: number, isLoading?: boolean) => {
      state.distance = distance;

      if (isLoading) {
        state.status = 'loading';
      } else if (distance === 0) {
        state.status = 'normal';
      } else if (distance < PULL_DISTANCE) {
        state.status = 'pulling';
      } else {
        state.status = 'loosing';
      }
    };

    // 根据状态修改loadingText值
    const loadingTexts = ref(
      props.loadingTexts?.length ? props.loadingTexts : ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'],
    );

    const loadingText = computed(() => {
      if (state.status === 'pulling') {
        return loadingTexts.value[0];
      }
      if (state.status === 'loosing') {
        return loadingTexts.value[1];
      }
      if (state.status === 'loading') {
        return loadingTexts.value[2];
      }
      if (state.status === 'success') {
        return loadingTexts.value[3];
      }
      return '';
    });

    // touch事件逻辑
    const touch = useTouch();

    const isTouchable = () => state.status !== 'loading' && state.status !== 'success';

    // 确保可滚动的父元素此时处于未滚动状态
    const isReachTop = (e: TouchEvent) => {
      const scrollParent = getScrollParent(e.target as Element);
      return !scrollParent || !scrollParent.scrollTop;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!isReachTop(e)) return;

      if (isTouchable()) {
        state.duration = 0;
        touch.start(e);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouchable()) return;
      if (!isReachTop(e)) return;

      const { deltaY } = touch;
      const nextDistance = easeDistance(deltaY.value, PULL_DISTANCE);
      if (deltaY.value >= 0 && nextDistance <= props.maxBarHeight) {
        e.preventDefault();
        setStatus(nextDistance);
      }
      touch.move(e);
    };

    let timer: any = null;
    const onTouchEnd = () => {
      state.duration = ANIMATION_DURATION;
      if (state.status === 'loosing') {
        setStatus(props.loadingBarHeight, true);
        emitEvent('refresh');

        timer = setTimeout(() => {
          emitEvent('timeout');
          state.status = 'normal';
          setTimeout(() => {
            setStatus(0, false);
          }, ANIMATION_DURATION);
        }, props.refreshTimeout);
      } else {
        setStatus(0);
      }
    };

    // 监听value变化，当value变为false，代表下拉加载已结束，可以扭转loading状态了
    watch(
      () => props.modelValue,
      (value) => {
        if (!value) {
          state.status = 'success';
          clearTimeout(timer);

          setTimeout(() => {
            setStatus(0, false);
          }, ANIMATION_DURATION);
        }
      },
    );

    onUnmounted(() => {
      clearTimeout(timer);
    });

    return {
      name,
      state,
      trackStyle,
      loadingText,
      tipsStyles,
      loadingIconProps,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };
  },
});
</script>
