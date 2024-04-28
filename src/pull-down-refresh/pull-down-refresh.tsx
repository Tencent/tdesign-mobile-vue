import { defineComponent, onUnmounted, ref, toRefs, computed, watch, onMounted } from 'vue';
import { useElementSize } from '@vueuse/core';
import debounce from 'lodash/debounce';
import PullDownRefreshProps from './props';
import { useVModel, convertUnit, reconvertUnit } from '../shared';
import { preventDefault } from '../shared/dom';
import config from '../config';
import TLoading from '../loading';
import { useContent } from '../hooks/tnode';
import { useTouch, isReachTop, easeDistance } from './useTouch';
import { useConfig } from '../config-provider/useConfig';

const { prefix } = config;
const name = `${prefix}-pull-down-refresh`;
const statusName = ['pulling', 'loosing', 'loading', 'success', 'initial'];

export default defineComponent({
  name,
  components: { TLoading },
  props: PullDownRefreshProps,
  emits: ['refresh', 'timeout', 'scrolltolower', 'update:value', 'update:modelValue'],
  setup(props) {
    const { globalConfig } = useConfig('pullDownRefresh');
    const renderContent = useContent();

    let timer: any = null;

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
      e.stopPropagation();
      if (!isReachTop(e) || loading.value) return;

      clearTimeout(timer);
      timer = null;
      distance.value = 0;
      touch.start(e);
      touchDir = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
      if (!isReachTop(e) || loading.value) return;
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
      e.stopPropagation();
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
    const renderLoading = () => {
      if (status.value === 'loading') {
        return <t-loading size="24px" text={loadingText.value} {...(props.loadingProps as object)}></t-loading>;
      }
      return <div class={`${name}__text`}>{loadingText.value}</div>;
    };
    return () => {
      const content = renderContent('default', 'content');
      let className = `${name}__track`;
      if (status.value !== 'pulling') {
        className = `${className} ${name}__track--loosing`;
      }
      return (
        <div class={name}>
          <div
            class={className}
            style={trackStyle.value}
            onTouchstart={onTouchStart}
            onTouchmove={onTouchMove}
            onTouchend={onTouchEnd}
            onTouchcancel={onTouchEnd}
            onTransitionend={onTransitionEnd}
          >
            <div ref={maxBar} class={`${name}__tips`} style={maxBarStyles.value}>
              <div ref={loadingBar} class={`${name}__loading`} style={loadingBarStyles.value}>
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
