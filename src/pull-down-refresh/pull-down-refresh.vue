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
      <div ref="maxBar" :class="`${name}__max`" :style="maxBarStyles">
        <div ref="loadingBar" :class="`${name}__loading`" :style="loadingBarStyles">
          <div v-if="status === 'loading'">
            <t-loading :text="loadingText" :class="`${name}__loading-icon`" v-bind="loadingIconProps" />
          </div>
          <div v-else>{{ loadingText }}</div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref, toRefs, computed, SetupContext, watch } from 'vue';
import { useElementSize } from '@vueuse/core';
import PullDownRefreshProps from './props';
import { useEmitEvent, useVModel } from '../shared';
import config from '../config';
import TLoading from '../loading';
import { useTouch, isReachTop, easeDistance } from './useTouch';

const { prefix } = config;
const name = `${prefix}-pull-down-refresh`;
const ANIMATION_DURATION = 300;
const statusName = ['pulling', 'loosing', 'loading', 'success', 'initial'];

export default defineComponent({
  name,
  components: { TLoading },
  props: PullDownRefreshProps,
  emits: ['refresh', 'timeout'],
  setup(props: any, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);

    // 动态生成style
    const trackStyle = computed(() => ({
      transitionDuration: `${ANIMATION_DURATION}ms`,
      transform: `translate3d(0, ${distance.value}px, 0)`,
    }));
    const loadingBarStyles = computed(() => ({
      height: typeof props.loadingBarHeight === 'number' ? `${props.loadingBarHeight}px` : props.loadingBarHeight,
    }));
    const maxBarStyles = computed(() => ({
      height: typeof props.maxBarHeight === 'number' ? `${props.maxBarHeight}px` : props.maxBarHeight,
    }));

    // 动态生成loadingIcon的props
    const loadingIconProps = computed(() => ({ ...props.loadingProps }));

    // 是否处于加载状态
    const isLoading = ref(false);

    // 滑动距离
    const distance = ref(0);
    const { value, modelValue } = toRefs(props);
    const [statusValue, setStatusValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    // 组件当前状态
    const status = computed(() => {
      if (!statusValue.value && isLoading.value) {
        return 'success';
      }
      if (!statusValue.value || distance.value === 0) {
        return 'initial';
      }
      if (distance.value < loadingBarHeight.value) {
        return 'pulling';
      }
      if (isLoading.value) {
        return 'loading';
      }
      return 'loosing';
    });

    watch(status, (newVal) => {
      // 下拉刷新结束后，收起下拉页面
      if (newVal === 'success' || newVal === 'initial') {
        // 延时300ms收起下拉框，加强刷新成功提示
        setTimeout(() => {
          distance.value = 0;
          isLoading.value = false;
        }, 300);
      }
    });

    // 根据状态修改loadingText值
    const loadingTexts = ref(
      props.loadingTexts?.length ? props.loadingTexts : ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'],
    );
    const loadingText = computed(() => {
      const index = statusName.indexOf(status.value);
      return index >= 0 ? loadingTexts.value[index] : '';
    });

    const touch = useTouch();
    const loadingBar = ref(null);
    const maxBar = ref(null);
    const { height: loadingBarHeight } = useElementSize(loadingBar);
    const { height: maxBarHeight } = useElementSize(maxBar);

    const onTouchStart = (e: TouchEvent) => {
      if (!isReachTop(e) || isLoading.value) return;

      setStatusValue(true);
      distance.value = 0;
      touch.start(e);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isReachTop(e) || isLoading.value) return;

      const { deltaY } = touch;
      const nextDistance = easeDistance(deltaY.value, loadingBarHeight.value);
      if (nextDistance >= 0 && nextDistance < maxBarHeight.value) {
        e.preventDefault();
        distance.value = nextDistance;
      }
      touch.move(e);
    };

    let timer: any = null;
    const onTouchEnd = (e: TouchEvent) => {
      if (!isReachTop(e) || isLoading.value) return;

      if (status.value === 'loosing') {
        distance.value = loadingBarHeight.value;
        isLoading.value = true;
        emitEvent('refresh');
        timer = setTimeout(() => {
          if (isLoading.value) {
            emitEvent('timeout');
            setStatusValue(false);
          }
        }, props.refreshTimeout);
      } else {
        setStatusValue(false);
      }
    };

    onUnmounted(() => {
      clearTimeout(timer);
    });

    return {
      name,
      status,
      trackStyle,
      loadingText,
      maxBarStyles,
      loadingBarStyles,
      loadingIconProps,
      loadingBar,
      maxBar,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };
  },
});
</script>
