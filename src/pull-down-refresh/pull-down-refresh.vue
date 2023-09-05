<template>
  <div ref="root" :class="name">
    <div
      ref="track"
      :style="trackStyle"
      @touchstart.stop="onTouchStart"
      @touchend.stop="onTouchEnd"
      @touchcancel.stop="onTouchEnd"
    >
      <div class="pull-refresh-head" :style="getHeadStyle()">
        <div v-if="slots[state.status]" :class="`pull-refresh-${state.status}`" :distance="state.distance">
          <slot :name="state.status" :distance="state.distance" />
        </div>
        <div v-else class="pull-refresh-text">
          {{ getStatusText() }}
          <t-loading v-if="state.status === 'loading'" :text="getStatusText()" class="pull-refresh-loading" />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, ref, watch } from 'vue';
import { useEventListener } from '@vueuse/core';

import PullDownRefreshProps from './props';

import config from '../config';
import { getScrollTop } from '../shared/util';
import { useScrollParent } from '../shared/useScrollParent';
import { useTouch } from './useTouch';
import { preventDefault } from '../shared/dom';

const { prefix } = config;
const name = `${prefix}-pull-down-refresh`;

const DEFAULT_HEAD_HEIGHT = 50;
const TEXT_STATUS = ['pulling', 'loosing', 'success'];

type PullRefreshStatus = 'normal' | 'loading' | 'loosing' | 'pulling' | 'success';

export default defineComponent({
  props: PullDownRefreshProps,
  emits: ['refresh', 'change', 'update:modelValue'],
  setup(props, { emit, slots }) {
    let reachTop: boolean;

    const root = ref<HTMLElement>();
    const track = ref<HTMLElement>();

    const state = reactive({
      status: 'normal' as PullRefreshStatus,
      distance: 0,
      duration: 0,
    });

    const touch = useTouch();
    const scrollParent = useScrollParent(root);

    const trackStyle = computed(() => {
      return {
        transitionDuration: `${state.duration}ms`,
        transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : '',
      };
    });

    const getHeadStyle = () => {
      if (props.maxBarHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: `${props.maxBarHeight}px`,
        };
      }
    };

    const getStatusText = () => {
      const { status } = state;
      if (status === 'normal') {
        return '';
      }
      return props[`${status}Text` as const];
    };

    const showSuccessTip = () => {
      state.status = 'success';

      setTimeout(() => {
        setStatus(0);
      }, +props.refreshTimeout);
    };

    const checkPosition = (event: TouchEvent) => {
      reachTop = getScrollTop(scrollParent.value!) === 0;

      if (reachTop) {
        state.duration = 0;
        touch.start(event);
      }
    };

    const isTouchable = () => state.status !== 'loading' && state.status !== 'success';

    const ease = (distance: number) => {
      const pullDistance = +(props.loadingBarHeight || props.maxBarHeight);

      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2;
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
        }
      }

      return Math.round(distance);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (isTouchable()) {
        checkPosition(event);
      }
    };

    const setStatus = (distance: number, isLoading?: boolean) => {
      const pullDistance = +(props.loadingBarHeight || props.maxBarHeight);
      state.distance = distance;

      if (isLoading) {
        state.status = 'loading';
      } else if (distance === 0) {
        state.status = 'normal';
      } else if (distance < pullDistance) {
        state.status = 'pulling';
      } else {
        state.status = 'loosing';
      }

      emit('change', {
        status: state.status,
        distance,
      });
    };

    const onTouchEnd = () => {
      if (reachTop && touch.deltaY.value && isTouchable()) {
        state.duration = props.refreshTimeout;

        if (state.status === 'loosing') {
          setStatus(+props.loadingBarHeight, true);
          emit('update:modelValue', true);
          nextTick(() => emit('refresh'));
        } else {
          setStatus(0);
        }
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (isTouchable()) {
        if (!reachTop) {
          checkPosition(event);
        }

        const { deltaY } = touch;
        touch.move(event);

        if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
          preventDefault(event);
          setStatus(ease(deltaY.value));
        }
      }
    };

    watch(
      () => props.modelValue,
      (value) => {
        state.duration = +props.refreshTimeout;

        if (value) {
          setStatus(+props.loadingBarHeight, true);
          // || props.successText
        } else if (slots.success) {
          showSuccessTip();
        } else {
          setStatus(0, false);
        }
      },
    );

    useEventListener(track, 'touchmove', onTouchMove);

    return {
      name,
      root,
      track,
      state,
      slots,
      trackStyle,
      getStatusText,
      getHeadStyle,
      onTouchStart,
      onTouchEnd,
    };
  },
});
</script>
