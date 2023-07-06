<template>
  <div :class="name">
    <div
      :class="[`${name}__track`, { [`${name}__track--loosing`]: status !== 'pulling' }]"
      :style="trackStyle"
      @touchstart.stop="onTouchStart"
      @touchmove.stop="onTouchMove"
      @touchend.stop="onTouchEnd"
      @touchcancel.stop="onTouchEnd"
      @transitionend="onTransitionEnd"
    >
      <div ref="maxBar" :class="`${name}__tips`" :style="maxBarStyles">
        <div ref="loadingBar" :class="`${name}__loading`" :style="loadingBarStyles">
          <t-loading v-if="status === 'loading'" size="24px" :text="loadingText" v-bind="loadingProps" />
          <div v-else :class="`${name}__text`">{{ loadingText }}</div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref, toRefs, computed, watch, onMounted } from 'vue';
import { useElementSize } from '@vueuse/core';
import debounce from 'lodash/debounce';
import isArray from 'lodash/isArray';

import PullDownRefreshProps from './props';
import { useVModel, convertUnit, reconvertUnit } from '../shared';
import { preventDefault } from '../shared/dom';
import config from '../config';
import TLoading from '../loading';
import { useTouch, isReachTop, easeDistance } from './useTouch';

const { prefix } = config;
const name = `${prefix}-pull-down-refresh`;
const statusName = ['pulling', 'loosing', 'loading', 'success', 'initial'];

export default defineComponent({
  name,
  components: { TLoading },
  props: PullDownRefreshProps,
  emits: ['refresh', 'timeout', 'scrolltolower', 'update:value', 'update:modelValue'],
  setup(props) {
    let timer: any = null;

    // 滑动距离
    const distance = ref(0);
    const afterLoading = ref(false);
    const { value, modelValue } = toRefs(props);
    const [loading, setLoading] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const loadingText = computed(() => {
      const index = statusName.indexOf(status.value);
      const loadingTexts = isArray(props.loadingTexts)
        ? props.loadingTexts
        : ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'];
      return index >= 0 ? loadingTexts[index] : '';
    });

    const touch = useTouch();
    const loadingBar = ref(null);
    const maxBar = ref(null);
    const { height: loadingBarHeight } = useElementSize(loadingBar);
    const { height: maxBarHeight } = useElementSize(maxBar);
    const actualLoadingBarHeight = ref(0);

    watch(
      [loading, loadingBarHeight],
      ([val], [prevVal]) => {
        if (val) {
          distance.value = loadingBarHeight.value;
        }
        if (!val && prevVal) {
          afterLoading.value = true;
        }
      },
      {
        immediate: true,
      },
    );

    const status = computed(() => {
      if (afterLoading.value) {
        return 'success';
      }
      if (!loading.value && distance.value === 0) {
        return 'initial';
      }
      if (distance.value < loadingBarHeight.value) {
        return 'pulling';
      }
      if (loading.value) {
        return 'loading';
      }
      return 'loosing';
    });

    watch(status, (newVal) => {
      if (newVal === 'success') {
        // 延时300ms收起下拉框，加强刷新成功提示
        setTimeout(() => {
          distance.value = 0;
        }, 300);
      }
    });

    const onTouchStart = (e: TouchEvent) => {
      if (!isReachTop(e) || loading.value) return;

      clearTimeout(timer);
      timer = null;
      distance.value = 0;
      touch.start(e);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isReachTop(e) || loading.value) return;

      const { deltaY } = touch;
      actualLoadingBarHeight.value = deltaY.value;
      const nextDistance = easeDistance(deltaY.value, loadingBarHeight.value);
      // 下拉时，防止下拉整个页面
      if (deltaY.value > 0) {
        preventDefault(e, false);
      }
      if (nextDistance >= 0 && nextDistance < maxBarHeight.value) {
        distance.value = nextDistance;
      }
      touch.move(e);
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isReachTop(e) || loading.value) return;

      if (status.value === 'loosing') {
        distance.value = loadingBarHeight.value;
        setLoading(true);
        props.onRefresh?.();
        timer = setTimeout(() => {
          if (loading.value) {
            props.onTimeout?.();
            setLoading(false);
          }
        }, props.refreshTimeout);
      } else {
        distance.value = 0;
      }
    };

    const onReachBottom = debounce(
      () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动高度
        const { clientHeight, scrollHeight } = document.documentElement; // 可视区域/屏幕高度， 页面高度
        const distance = 20; // 距离视窗 20 时，开始触发
        if (scrollTop + clientHeight >= scrollHeight - distance) {
          props.onScrolltolower?.();
        }
      },
      300,
      {
        leading: true,
        trailing: false,
      },
    );

    const onTransitionEnd = () => {
      if (afterLoading.value) {
        afterLoading.value = false;
      }
    };

    const trackStyle = computed(() => {
      return {
        transform: `translate3d(0, ${distance.value}px, 0)`,
      };
    });
    const heightDiff = (reconvertUnit(props.maxBarHeight) - reconvertUnit(props.loadingBarHeight)) / 2;
    const loadingBarStyles = computed(() => {
      return {
        transform: `translateY(${heightDiff}px)`,
        height: `${actualLoadingBarHeight.value}px`,
        maxHeight: convertUnit(props.loadingBarHeight),
      };
    });
    const maxBarStyles = computed(() => ({
      height: convertUnit(props.maxBarHeight),
    }));

    onMounted(() => {
      window.addEventListener('scroll', onReachBottom);
    });

    onUnmounted(() => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onReachBottom);
    });

    return {
      name,
      status,
      trackStyle,
      loadingText,
      maxBarStyles,
      loadingBarStyles,
      loadingBar,
      maxBar,
      loading,
      distance,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTransitionEnd,
    };
  },
});
</script>
