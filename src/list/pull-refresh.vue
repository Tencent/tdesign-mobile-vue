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
      <div :class="`${name}__head`">
        <div v-if="SHOW_TEXT_LIST.includes(state.status)">{{ TEXT_MAP[state.status] }}</div>
        <div v-if="state.status === 'loading'">
          <t-loading :text="t(globalConfig.loading)" />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref, computed, watch } from 'vue';
import { preventDefault } from '../shared/dom';
import config from '../config';
import TLoading from '../loading';
import { useConfig } from '../config-provider/useConfig';

const { prefix } = config;
const { t, globalConfig } = useConfig('list');
const name = `${prefix}-pull-refresh`;
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
const TEXT_MAP = {
  loading: globalConfig.value.loading,
  pulling: globalConfig.value.pulling,
  loosing: globalConfig.value.loosing,
  success: globalConfig.value.success,
};
const SHOW_TEXT_LIST = ['pulling', 'loosing', 'success'];
const PullRefreshProps = {
  modelValue: Boolean,
};

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
  props: PullRefreshProps,
  emits: ['refresh', 'update:modelValue'],
  setup(props, { emit }) {
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

    const touch = useTouch();

    const isTouchable = () => state.status !== 'loading' && state.status !== 'success';

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
      if (deltaY.value >= 0) {
        preventDefault(e, false);
        setStatus(easeDistance(deltaY.value, PULL_DISTANCE));
      }
      touch.move(e);
    };

    const onTouchEnd = () => {
      state.duration = ANIMATION_DURATION;
      if (state.status === 'loosing') {
        emit('update:modelValue', true);
        nextTick(() => emit('refresh'));
      } else {
        setStatus(0);
      }
    };

    const trackStyle = computed(() => ({
      transitionDuration: `${state.duration}ms`,
      transform: state.distance ? `translate3d(0, ${state.distance}px, 0)` : '',
    }));

    watch(
      () => props.modelValue,
      (value) => {
        if (value) {
          setStatus(PULL_DISTANCE, true);
        } else {
          state.status = 'success';

          setTimeout(() => {
            setStatus(0, false);
          }, ANIMATION_DURATION);
        }
      },
    );

    return {
      name,
      state,
      trackStyle,
      TEXT_MAP,
      SHOW_TEXT_LIST,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };
  },
});
</script>
