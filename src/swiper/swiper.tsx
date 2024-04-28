import { onMounted, computed, ref, provide, watch, onUnmounted, toRefs, defineComponent } from 'vue';
import isObject from 'lodash/isObject';
import isNumber from 'lodash/isNumber';
import { useSwipe } from '../swipe-cell/useSwipe';

import config from '../config';
import SwiperProps from './props';
import { SwiperChangeSource, SwiperNavigation } from './type';
import { useVModel } from '../shared';
import { preventDefault } from '../shared/dom';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;
const name = `${prefix}-swiper`;
const navName = `${prefix}-swiper-nav`;
export default defineComponent({
  name,
  props: SwiperProps,
  emits: ['change', 'update:current', 'update:modelValue'],
  setup(props, context) {
    const readerTNodeJSX = useTNodeJSX();

    const setOffset = (offset: number, direction = 'X'): void => {
      translateContainer.value = `translate${direction}(${offset}px)`;
    };

    const root = ref();
    const items = ref<any>([]);

    const { current: value, modelValue } = toRefs(props);

    const [current, setCurrent] = useVModel(value, modelValue, props.defaultCurrent);
    const swiperContainer = ref<HTMLElement | null>(null);
    // const computedNavigation = computed(() => (isObject(props.navigation) ? '' : renderTNode(self, 'navigation')));
    // const computedNavigation = computed(() => (isObject(props.navigation) ? '' : readerTNodeJSX('navigation')));

    const animating = ref(false);
    const disabled = ref(false);
    const isSwiperDisabled = computed(() => props.disabled === true);
    const translateContainer = ref('');

    const isVertical = computed(() => props.direction === 'vertical');
    const containerHeight = ref('auto');

    const navigation = computed((): SwiperNavigation => props.navigation);

    const isBottomPagination = computed(() => {
      let isShowSwiperNav = false;
      if (typeof props.navigation === 'object') {
        isShowSwiperNav =
          (!navigation.value?.paginationPosition || navigation.value?.paginationPosition === 'bottom') &&
          (navigation.value?.type === 'dots' || navigation.value?.type === 'dots-bar') &&
          enableNavigation?.value;
      }
      return isShowSwiperNav;
    });

    const rootClass = computed(() => {
      return [
        `${name}`,
        `${name}--${props.type}`,
        `${isBottomPagination.value ? `${name}--${navigation.value.placement}` : ''}`,
      ];
    });

    const enableNavigation = computed(() => {
      if (typeof props.navigation === 'object') {
        return navigation.value?.minShowNum ? items.value.length >= navigation.value?.minShowNum : true;
      }
      return false;
    });

    let autoplayTimer: any = null;

    const onItemClick = () => {
      props.onClick?.(current.value ?? 0);
    };

    const move = (step: number, source: SwiperChangeSource, isReset = false) => {
      animating.value = true;
      processIndex(isReset ? step : (current.value as number) + step, source);

      const moveDirection = !isVertical.value ? 'X' : 'Y';
      const distance = root.value?.[isVertical.value ? 'offsetHeight' : 'offsetWidth'] ?? 0;

      translateContainer.value = `translate${moveDirection}(${isReset ? 0 : -1 * distance * step}px)`;
    };

    const handleAnimationEnd = () => {
      disabled.value = false;
      animating.value = false;
      translateContainer.value = 'translateX(0)';

      updateItemPosition();
    };

    const stopAutoplay = () => {
      if (!autoplayTimer) return;
      clearInterval(autoplayTimer as number);
      autoplayTimer = null;
    };

    const startAutoplay = () => {
      if (typeof props.current === 'number') return false;
      if (!props?.autoplay || autoplayTimer !== null) return false; // stop repeat autoplay
      autoplayTimer = setInterval(() => {
        goNext('autoplay');
      }, props?.interval);
    };

    const goPrev = (source: SwiperChangeSource) => {
      disabled.value = true;
      move(-1, source);
    };
    const goNext = (source: SwiperChangeSource) => {
      disabled.value = true;
      move(1, source);
    };

    const processIndex = (index: number, source: SwiperChangeSource) => {
      const max = items.value.length;
      let val = index;

      if (index < 0) {
        val = props.loop ? max - 1 : 0;
      }
      if (index >= max) {
        val = props.loop ? 0 : max - 1;
      }
      setCurrent(val);
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
      const distanceX = lengthX.value;
      const distanceY = lengthY.value;

      animating.value = false;

      if (!isVertical.value) {
        setOffset(-distanceX);
      } else {
        setOffset(-distanceY, 'Y');
      }
    };

    const onTouchEnd = () => {
      const distanceX = lengthX.value;
      const distanceY = lengthY.value;

      if ((!isVertical.value && distanceX < -100) || (isVertical.value && distanceY < -100)) {
        move(-1, 'touch');
      } else if ((!isVertical.value && distanceX > 100) || (isVertical.value && distanceY > 100)) {
        move(1, 'touch');
      } else {
        move(current.value as number, 'touch', true);
      }
      startAutoplay();
    };

    const addChild = (item: any) => {
      items.value.push(item);
    };

    const removeChild = (uid: number) => {
      const index = items.value.findIndex((item: any) => item.uid === uid);
      items.value.splice(index, 1);

      if (current.value + 1 > items.value.length) {
        goNext('autoplay');
      }
    };

    const updateItemPosition = () => {
      items.value.forEach((item: any, index: number) => {
        item.calcTranslateStyle(index, current.value);
      });
    };

    const setContainerHeight = (height: number | string) =>
      (containerHeight.value = isNumber(height) ? `${height}px` : height);

    const updateContainerHeight = () => {
      const target = items.value[current.value ?? 0];
      const rect = target?.proxy?.$el.getBoundingClientRect();

      if (props.height) {
        setContainerHeight(props.height);
      } else if (rect) {
        setContainerHeight(rect.height);
      }
      updateItemPosition();
    };

    watch(current, updateContainerHeight);

    provide('parent', {
      loop: props.loop,
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
    return () => {
      const swiperNav = () => {
        if (navigation.value && enableNavigation.value) {
          const controlsNav = () => {
            if (!isVertical.value && !!navigation.value?.showControls) {
              return (
                <span class={`${navName}__btn`}>
                  <span class={`${navName}__btn--prev`} onClick={() => goPrev('nav')} />
                  <span class={`${navName}__btn--next`} onClick={() => goNext('nav')} />
                </span>
              );
            }
          };
          const typeNav = () => {
            if ('type' in navigation.value) {
              // dots
              const dots = () => {
                if (['dots', 'dots-bar'].includes(navigation.value.type || '')) {
                  return (
                    <>
                      {items.value.map((_: any, index: number) => (
                        <span
                          key={`page${index}`}
                          class={[
                            `${navName}__${navigation.value.type}-item`,
                            index === current.value ? `${navName}__${navigation.value.type}-item--active` : '',
                            `${navName}__${navigation.value.type}-item--${props.direction}`,
                          ]}
                        />
                      ))}
                    </>
                  );
                }
              };
              // fraction
              const fraction = () => {
                if (navigation.value.type && navigation.value.type === 'fraction') {
                  return <span>{`${(current.value ?? 0) + 1}/${items.value.length}`}</span>;
                }
              };
              return (
                <span
                  class={[
                    `${navName}--${props.direction}`,
                    `${navName}__${navigation.value.type || ''}`,
                    `${navName}--${navigation.value.paginationPosition || 'bottom'}`,
                    `${isBottomPagination.value ? `${navName}--${navigation.value.placement}` : ''}`,
                  ]}
                >
                  {dots()}
                  {fraction()}
                </span>
              );
            }
          };

          return (
            <>
              {controlsNav()}
              {typeNav()}
            </>
          );
        }
        return isObject(props.navigation) ? '' : readerTNodeJSX('navigation');
      };
      return (
        <>
          <div ref={root} class={rootClass.value}>
            <div
              ref={swiperContainer}
              class={`${name}__container`}
              style={{
                flexDirection: !isVertical.value ? 'row' : 'column',
                transition: animating.value ? `transform ${props.duration}ms` : 'none',
                transform: translateContainer.value,
                height: containerHeight.value,
              }}
              onTransitionend={(event: TransitionEvent) => {
                if (event.target === event.currentTarget) {
                  handleAnimationEnd();
                }
              }}
              onClick={onItemClick}
            >
              {readerTNodeJSX('default')}
            </div>
            {swiperNav()}
          </div>
        </>
      );
    };
  },
});
