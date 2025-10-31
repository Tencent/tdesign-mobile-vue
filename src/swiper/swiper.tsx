import { onMounted, computed, ref, provide, watch, onUnmounted, toRefs, defineComponent } from 'vue';
import { isNumber, isObject } from 'lodash-es';
import { useSwipe } from '../swipe-cell/useSwipe';
import config from '../config';
import props from './props';
import { SwiperChangeSource, SwiperNavigation } from './type';
import useVModel from '../hooks/useVModel';
import { preventDefault } from '../shared/dom';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const defaultSwiperNavigation: SwiperNavigation = {
  paginationPosition: 'bottom',
  placement: 'inside',
  showControls: false,
  type: 'dots',
};

/**
 * 滑动触发阈值
 */
const SWIPE_THRESHOLD = 100;

const { prefix } = config;

// 定义 SwiperItem 的接口
interface SwiperItemInstance {
  uid: number;
  proxy: any;
  calcTranslateStyle: (index: number, activeIndex: number) => void;
}

export default defineComponent({
  name: `${prefix}-swiper`,
  props,
  emits: ['change', 'update:current', 'update:modelValue', 'transitionenter', 'transitionleave'],
  setup(props, context) {
    const swiperClass = usePrefixClass('swiper');
    const swiperNavClass = usePrefixClass('swiper-nav');

    // 解构 props，保持响应性
    const {
      autoplay,
      interval,
      navigation,
      disabled: propsDisabled,
      direction,
      type,
      loop,
      height,
      duration,
      onClick,
      defaultCurrent,
    } = toRefs(props);

    const renderTNodeJSX = useTNodeJSX();
    const setOffset = (offset: number, dir: 'X' | 'Y' = 'X'): void => {
      translateContainer.value = `translate${dir}(${offset}px)`;
    };

    const root = ref();
    const items = ref<SwiperItemInstance[]>([]);
    const { current: value, modelValue } = toRefs(props);
    const [currentIndex, setCurrent] = useVModel(value, modelValue, defaultCurrent.value);
    const swiperContainer = ref<HTMLElement | null>(null);
    const previous = ref(currentIndex.value ?? 0);

    const animating = ref(false);
    const disabled = ref(false);
    const isSwiperDisabled = computed(() => propsDisabled.value === true);
    const translateContainer = ref('');

    const isVertical = computed(() => direction.value === 'vertical');
    const containerHeight = ref('auto');

    const navigationConfig = computed<SwiperNavigation>(() => {
      if (navigation.value === true) {
        return defaultSwiperNavigation;
      }
      if (isObject(navigation.value)) {
        return {
          ...defaultSwiperNavigation,
          ...navigation.value,
        } as SwiperNavigation;
      }

      return {};
    });

    const rootClass = computed(() => {
      const classes = [swiperClass.value, `${swiperClass.value}--${type.value}`];
      if (navigationConfig.value?.placement) {
        classes.push(`${swiperClass.value}--${navigationConfig.value.placement}`);
      }
      return classes;
    });

    const enableNavigation = computed(() => {
      if (!navigation.value) return false;

      if (navigation.value === true) return true;

      // navigation 为对象时，检查 minShowNum 配置
      if (typeof navigation.value === 'object') {
        return navigationConfig.value?.minShowNum ? items.value.length >= navigationConfig.value?.minShowNum : true;
      }

      return false;
    });

    let autoplayTimer: ReturnType<typeof setInterval> | null = null;

    const onItemClick = () => {
      onClick?.value?.(currentIndex.value ?? 0);
    };

    const move = (step: number, source: SwiperChangeSource, isReset = false, targetValue?: number) => {
      const nextIndex = currentIndex.value + step;
      if (!loop.value && !(isReset || typeof targetValue === 'number')) {
        if (nextIndex < 0 || nextIndex >= items.value.length) return;
      }

      animating.value = true;
      const innerTargetValue = targetValue ?? (isReset ? step : nextIndex);
      processIndex(innerTargetValue, source);

      const moveDirection = !isVertical.value ? 'X' : 'Y';
      const distance = root.value?.[isVertical.value ? 'offsetHeight' : 'offsetWidth'] ?? 0;

      translateContainer.value = `translate${moveDirection}(${isReset ? 0 : -1 * distance * step}px)`;
    };

    const handleAnimationEnd = () => {
      disabled.value = false;
      animating.value = false;
      translateContainer.value = `translate${isVertical.value ? 'Y' : 'X'}(0)`;

      updateItemPosition();
    };

    const stopAutoplay = () => {
      if (!autoplayTimer) return;
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    };

    const startAutoplay = () => {
      if (!autoplay.value || autoplayTimer !== null) return false; // stop repeat autoplay
      autoplayTimer = setInterval(() => {
        goNext('autoplay');
      }, interval.value);
    };

    const goPrev = (source: SwiperChangeSource) => {
      disabled.value = true;
      move(-1, source);
    };
    const goNext = (source: SwiperChangeSource) => {
      disabled.value = true;
      move(1, source);
    };

    const innerSetCurrent = (val: number) => {
      setCurrent(val);
      previous.value = val;
    };

    const processIndex = (index: number, source: SwiperChangeSource) => {
      const max = items.value.length;
      let val = index;

      if (index < 0) {
        val = loop.value ? max - 1 : 0;
      }
      if (index >= max) {
        val = loop.value ? 0 : max - 1;
      }
      innerSetCurrent(val);
      context.emit('update:current', val);
      context.emit('change', val, { source });
    };

    const { lengthX, lengthY } = useSwipe(swiperContainer, {
      onSwipeStart() {
        if (disabled.value || isSwiperDisabled.value || !items.value.length) return;
        stopAutoplay();
      },
      onSwipe(e: TouchEvent) {
        if (disabled.value || isSwiperDisabled.value || !items.value.length) return;
        onTouchMove(e);
      },
      onSwipeEnd() {
        if (disabled.value || isSwiperDisabled.value || !items.value.length) return;
        onTouchEnd();
      },
    });

    const onTouchMove = (event: TouchEvent) => {
      preventDefault(event, false);

      animating.value = false;

      const curIndex = currentIndex.value;
      const maxIndex = items.value.length - 1;
      const distance = isVertical.value ? lengthY.value : lengthX.value;
      const dir = isVertical.value ? 'Y' : 'X';

      // 非loop状态: 阻止第一项向左滑(显示上一项)和最后一项向右滑(显示下一项)
      if (!loop.value && ((curIndex <= 0 && distance < 0) || (curIndex >= maxIndex && distance > 0))) return;

      setOffset(-distance, dir);
    };

    const onTouchEnd = () => {
      const distance = isVertical.value ? lengthY.value : lengthX.value;

      if (distance < -SWIPE_THRESHOLD) {
        move(-1, 'touch');
      } else if (distance > SWIPE_THRESHOLD) {
        move(1, 'touch');
      } else {
        move(currentIndex.value as number, 'touch', true);
      }
      startAutoplay();
    };

    const onTransitionstart = (event: TransitionEvent) => {
      context.emit('transitionenter', event);
    };

    const onTransitionend = (event: TransitionEvent) => {
      context.emit('transitionleave', event);
    };

    const addChild = (item: SwiperItemInstance) => {
      items.value.push(item);
    };

    const removeChild = (uid: number) => {
      const removedIndex = items.value.findIndex((item) => item.uid === uid);
      if (removedIndex === -1) return;

      items.value.splice(removedIndex, 1);

      // 如果删除后没有项了，重置索引
      if (items.value.length === 0) {
        innerSetCurrent(0);
        return;
      }

      // 根据删除位置调整当前索引
      if (removedIndex < currentIndex.value) {
        // 删除的是前面的项，当前索引需要 -1（保持显示相同内容）
        innerSetCurrent(currentIndex.value - 1);
      } else if (removedIndex === currentIndex.value && currentIndex.value >= items.value.length) {
        // 删除的是当前项，且索引已越界，调整到最后一项
        innerSetCurrent(items.value.length - 1);
      }

      updateItemPosition();
    };

    const updateItemPosition = () => {
      if (!items.value.length) return;
      items.value.forEach((item, index) => {
        item.calcTranslateStyle(index, currentIndex.value);
      });
    };

    const setContainerHeight = (height: number | string) =>
      (containerHeight.value = isNumber(height) ? `${height}px` : height);

    const updateContainerHeight = () => {
      if (height.value) {
        setContainerHeight(height.value);
        return;
      }

      const target = items.value[currentIndex.value ?? 0];
      const rect = target?.proxy?.$el.getBoundingClientRect();
      if (rect) {
        setContainerHeight(rect.height);
      }
    };

    watch(currentIndex, updateContainerHeight);
    watch(
      () => props.current,
      (val, oldVal) => {
        // v-model动态更新时不触发move逻辑
        if (val === previous.value) return;
        stopAutoplay();
        move(val - oldVal, 'autoplay', false, val);
        startAutoplay();
      },
    );

    provide('parent', {
      loop,
      root,
      items,
      isVertical,
      addChild,
      removeChild,
      setContainerHeight,
    });

    onMounted(() => {
      startAutoplay();
      updateItemPosition();
      updateContainerHeight();
    });

    onUnmounted(() => {
      stopAutoplay();
    });

    // 渲染控制按钮（左右箭头）
    const renderControlsNav = () => {
      if (isVertical.value || !navigationConfig.value?.showControls) return null;

      return (
        <span class={`${swiperNavClass.value}__btn`}>
          <span class={`${swiperNavClass.value}__btn--prev`} onClick={() => goPrev('nav')} />
          <span class={`${swiperNavClass.value}__btn--next`} onClick={() => goNext('nav')} />
        </span>
      );
    };

    // 渲染点状导航
    const renderDotsNav = () => {
      const navType = navigationConfig.value.type;
      if (!navType || !['dots', 'dots-bar'].includes(navType)) return null;

      return (
        <>
          {items.value.map((_, index) => (
            <span
              key={`page${index}`}
              class={[
                `${swiperNavClass.value}__${navType}-item`,
                index === currentIndex.value && `${swiperNavClass.value}__${navType}-item--active`,
                `${swiperNavClass.value}__${navType}-item--${direction.value}`,
              ]}
            />
          ))}
        </>
      );
    };

    // 渲染分式导航 (1/5)
    const renderFractionNav = () => {
      if (navigationConfig.value?.type !== 'fraction') return null;
      return <span>{`${(currentIndex.value ?? 0) + 1}/${items.value.length}`}</span>;
    };

    // 渲染导航类型（dots/fraction）
    const renderTypeNav = () => {
      if (!('type' in navigationConfig.value)) return null;

      return (
        <span
          class={[
            `${swiperNavClass.value}--${direction.value}`,
            `${swiperNavClass.value}__${navigationConfig.value?.type || ''}`,
            `${swiperNavClass.value}--${navigationConfig.value?.paginationPosition || 'bottom'}`,
            navigationConfig.value?.placement && `${swiperNavClass.value}--${navigationConfig.value.placement}`,
          ].filter(Boolean)}
        >
          {renderDotsNav()}
          {renderFractionNav()}
        </span>
      );
    };

    return () => {
      const swiperNav = () => {
        if (enableNavigation.value) {
          return (
            <>
              {renderControlsNav()}
              {renderTypeNav()}
            </>
          );
        }
        return isObject(navigation.value) ? null : renderTNodeJSX('navigation');
      };

      return (
        <div ref={root} class={rootClass.value}>
          <div
            ref={swiperContainer}
            class={`${swiperClass.value}__container`}
            style={{
              flexDirection: isVertical.value ? 'column' : 'row',
              transition: animating.value ? `transform ${duration.value}ms` : 'none',
              transform: translateContainer.value,
              height: containerHeight.value,
            }}
            onTransitionstart={onTransitionstart}
            onTransitionend={(event: TransitionEvent) => {
              if (event.target === event.currentTarget) {
                onTransitionend(event);
                handleAnimationEnd();
              }
            }}
            onClick={onItemClick}
          >
            {renderTNodeJSX('default')}
          </div>
          {swiperNav()}
        </div>
      );
    };
  },
});
