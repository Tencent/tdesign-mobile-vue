import { defineComponent, onUnmounted, ref, toRefs, computed, watch, onMounted } from 'vue';
import { useElementSize } from '@vueuse/core';
import { throttle } from 'lodash-es';
import PullDownRefreshProps from './props';
import { convertUnit, reconvertUnit } from '../shared';
import { preventDefault } from '../shared/dom';
import config from '../config';
import TLoading from '../loading';
import useVModel from '../hooks/useVModel';
import { useContent } from '../hooks/tnode';
import { useTouch, isReachTop, easeDistance, getScrollParent } from './useTouch';
import { usePrefixClass, useConfig } from '../hooks/useClass';

const { prefix } = config;

const statusName = ['pulling', 'loosing', 'loading', 'success', 'initial'];

/** 触底检测阈值（距离底部多少像素时触发） */
const SCROLL_TO_LOWER_THRESHOLD = 20;

export default defineComponent({
  name: `${prefix}-pull-down-refresh`,
  components: { TLoading },
  props: PullDownRefreshProps,
  emits: ['refresh', 'timeout', 'scrolltolower', 'update:value', 'update:modelValue'],
  setup(props) {
    const pullDownRefreshClass = usePrefixClass('pull-down-refresh');
    const { globalConfig } = useConfig('pullDownRefresh');
    const renderContent = useContent();

    let timer: any = null;
    const scrollContainerRef = ref<Element | Window | null>(null);

    // 滑动距离
    const distance = ref(0);
    const afterLoading = ref(false);
    const { value, modelValue } = toRefs(props);
    const [loading, setLoading] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const loadingText = computed(() => {
      const index = statusName.indexOf(status.value);
      const loadingTexts = props.loadingTexts?.length > 0 ? props.loadingTexts : globalConfig.value.loadingTexts;
      return index >= 0 ? loadingTexts[index] : '';
    });

    const touch = useTouch();
    const loadingBar = ref();
    const maxBar = ref();
    const rootRef = ref<HTMLElement>();
    const { height: loadingBarHeight } = useElementSize(loadingBar);
    const { height: maxBarHeight } = useElementSize(maxBar);
    const actualLoadingBarHeight = ref(0);

    // 默认 0 左右移动 1 上下移动 -1
    let touchDir: -1 | 0 | 1;
    const touchThreshold = 5;

    watch(
      [loading, loadingBarHeight],
      ([val], [prevVal]) => {
        if (val) {
          distance.value = Math.round(loadingBarHeight.value);
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
      const reconvertHeight = Math.round(reconvertUnit(props.loadingBarHeight));
      if (afterLoading.value) {
        return 'success';
      }
      if (!loading.value && distance.value === 0) {
        return 'initial';
      }
      if (distance.value < reconvertHeight) {
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

    // 统一判断是否可以滑动
    const isTouchable = () => loading.value || props.disabled;

    const onTouchStart = (e: TouchEvent) => {
      if (isTouchable()) return;
      if (!isReachTop(e)) return;

      clearTimeout(timer);
      timer = null;
      distance.value = 0;
      touch.start(e);
      touchDir = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isTouchable()) return;
      if (!isReachTop(e)) return;

      touch.move(e);

      const { diffY, diffX } = touch;
      const absX = Math.abs(diffX.value);
      const absY = Math.abs(diffY.value);

      if (!touchDir && absX < touchThreshold && absY < touchThreshold) {
        return;
      }
      if (!touchDir && absX < absY) {
        touchDir = -1;
      } else if (!touchDir && absX >= absY) {
        touchDir = 1;
      }

      // 左右移动时，不进行后续操作
      if (touchDir === 1) return;

      actualLoadingBarHeight.value = diffY.value;
      const nextDistance = easeDistance(diffY.value, loadingBarHeight.value);
      // 下拉时，防止下拉整个页面
      if (diffY.value > 0) {
        preventDefault(e, false);
      }
      if (nextDistance >= 0 && nextDistance < maxBarHeight.value) {
        distance.value = nextDistance;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isTouchable()) return;
      if (!isReachTop(e)) return;

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

    const isReachBottom = () => {
      const container = scrollContainerRef.value;
      if (!container) return false;
      if (container === window) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const { clientHeight, scrollHeight } = document.documentElement;
        return scrollTop + clientHeight >= scrollHeight - SCROLL_TO_LOWER_THRESHOLD;
      }
      const el = container as Element;
      return el.scrollTop + el.clientHeight >= el.scrollHeight - SCROLL_TO_LOWER_THRESHOLD;
    };

    const onScroll = throttle(
      () => {
        if (!loading.value && isReachBottom()) {
          props.onScrolltolower?.();
        }
      },
      300,
      { leading: false, trailing: true },
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
      // 自动检测滚动容器：优先使用最近的滚动父元素，否则使用 window
      scrollContainerRef.value = rootRef.value ? getScrollParent(rootRef.value) || window : window;
      scrollContainerRef.value.addEventListener('scroll', onScroll);
    });

    onUnmounted(() => {
      clearTimeout(timer);
      scrollContainerRef.value?.removeEventListener('scroll', onScroll);
    });
    const renderLoading = () => {
      if (status.value === 'loading') {
        return <t-loading size="24px" text={loadingText.value} {...(props.loadingProps as object)}></t-loading>;
      }
      return <div class={`${pullDownRefreshClass.value}__text`}>{loadingText.value}</div>;
    };
    return () => {
      const content = renderContent('default', 'content');
      let className = `${pullDownRefreshClass.value}__track`;
      if (status.value !== 'pulling') {
        className = `${className} ${pullDownRefreshClass.value}__track--loosing`;
      }
      return (
        <div ref={rootRef} class={pullDownRefreshClass.value}>
          <div
            class={className}
            style={trackStyle.value}
            onTouchstart={onTouchStart}
            onTouchmove={onTouchMove}
            onTouchend={onTouchEnd}
            onTouchcancel={onTouchEnd}
            onTransitionend={onTransitionEnd}
          >
            <div ref={maxBar} class={`${pullDownRefreshClass.value}__tips`} style={maxBarStyles.value}>
              <div ref={loadingBar} class={`${pullDownRefreshClass.value}__loading`} style={loadingBarStyles.value}>
                {renderLoading()}
              </div>
            </div>
            {content}
          </div>
        </div>
      );
    };
  },
});
