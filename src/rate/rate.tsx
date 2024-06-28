import { computed, defineComponent, ref, h } from 'vue';
import { StarFilledIcon } from 'tdesign-icons-vue-next';
import { onClickOutside } from '@vueuse/core';
import props from './props';
import config from '../config';
import { TdRateProps } from './type';
import { useDefault } from '../shared';
import { useFormDisabled } from '../form/hooks';
import { useConfig } from '../config-provider/useConfig';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-rate`,
  props,
  setup(props, context) {
    const rateClass = usePrefixClass('rate');
    const { t, globalConfig } = useConfig('rate');
    const isDisabled = useFormDisabled();

    const rateWrapper = ref<HTMLElement>();
    const [actualVal] = useDefault<number, TdRateProps>(props, context.emit, 'value', 'change');
    const rateText = computed(() => {
      if (Array.isArray(props.texts) && props.texts.length > 0) {
        return props.texts[actualVal.value - 1];
      }

      return actualVal.value > 0
        ? t(globalConfig.value.valueText, { value: actualVal.value })
        : globalConfig.value.noValueText;
    });
    const colors = computed(() => {
      const { color } = props;
      if (Array.isArray(color) && color.length === 2) {
        return {
          '--td-rate-selected-color': color[0],
          '--td-rate-unselected-color': color[1],
        };
      }
      if (typeof color === 'string') {
        return {
          '--td-rate-selected-color': color,
        };
      }
      return {};
    });

    const regSize = (val: string | number) => {
      return `${val}`.includes('px') ? val : `${val}px`;
    };
    const unitConvert = (value: number | string): number => {
      if (typeof value === 'string') {
        return parseInt(value, 10);
      }
      return value;
    };

    const icon = (isSelect: boolean) => {
      const { icon } = props;
      const startComponent = StarFilledIcon;
      let select = startComponent;
      let unSelect = startComponent;

      if (Array.isArray(icon)) {
        const [_select, _unSelect] = icon;
        if (typeof _select === 'function') {
          select = _select(h);
        } else {
          select = _select;
        }
        if (typeof _unSelect === 'function') {
          unSelect = _unSelect(h);
        } else {
          unSelect = _unSelect;
        }
      }
      if (isSelect) {
        return select || startComponent;
      }
      return unSelect || startComponent;
    };

    const rootClasses = computed(() => [`${rateClass.value}`, { [`${rateClass.value}--disabled`]: isDisabled.value }]);

    const classes = (n: number) => {
      const classPrefix = `${rateClass.value}__icon`;

      return {
        [classPrefix]: true,
        [`${classPrefix}--current`]: scaleIndex.value === Math.ceil(n),
        [`${classPrefix}--${actualVal.value >= n ? 'selected' : 'unselected'}`]: true,
      };
    };

    const ratePopoverRef = ref<HTMLElement>();
    const scaleIndex = ref(-1);
    const popoverValue = ref(0);
    const timer = ref<any>(null);
    const touchEnd = ref(false);
    const tipsVisible = ref(false);
    const tipsLeft = ref(0);
    const actionType = ref<'move' | 'tap'>('tap');
    const touchStartTime = ref(0);

    onClickOutside(ratePopoverRef, (event) => {
      hideTips();
    });

    const hideTips = (delay = false) => {
      if (delay) {
        timer.value = setTimeout(() => {
          handleCloseTips();
        }, 3000);
      } else {
        handleCloseTips();
      }
    };

    const handleCloseTips = () => {
      tipsVisible.value = false;
      scaleIndex.value = -1;
      if (timer.value) {
        clearTimeout(timer.value);
      }
    };

    const onClick = (event: MouseEvent) => {
      if (isDisabled.value) return;
      // if (Date.now() - touchStartTime.value > 200) return;
      getRect(event, 'tap');
    };

    const onTouch = (e: TouchEvent, eventType: 'move') => {
      const [touch] = e.touches;
      getRect(touch, eventType);
    };

    const onTouchstart = (e: TouchEvent) => {
      if (isDisabled.value) return;
      touchStartTime.value = Date.now();
      touchEnd.value = false;
    };

    const onTouchmove = (e: TouchEvent) => {
      if (isDisabled.value) return;
      if (Date.now() - touchStartTime.value <= 200) return;
      onTouch(e, 'move');
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isDisabled.value) return;
      touchEnd.value = true;
      hideTips();
    };

    const getRect = (event: Touch | MouseEvent, eventType: 'move' | 'tap') => {
      if (rateWrapper.value) {
        const { count, allowHalf, gap, value: currentValue, size } = props;
        const margin = unitConvert(gap);
        const { width, left } = rateWrapper.value.getBoundingClientRect();
        const starWidth = (width - (count - 1) * margin) / count;
        const offsetX = event.pageX - left;
        const num = (offsetX + margin) / (starWidth + margin);
        const remainder = num % 1;
        const integral = num - remainder;
        let value = remainder <= 0.5 && allowHalf ? integral + 0.5 : integral + 1;

        if (value > count) {
          value = count;
        } else if (value < 0) {
          value = 0;
        }

        popoverValue.value = value;
        const fontSize = size || getComputedStyle(rateWrapper.value).getPropertyValue('font-size');
        const leftDis = Math.ceil(value - 1) * (unitConvert(gap) + unitConvert(fontSize)) + unitConvert(fontSize) * 0.5;
        tipsVisible.value = true;
        tipsLeft.value = Math.max(leftDis, unitConvert(fontSize) * 0.5);
        scaleIndex.value = Math.ceil(value);
        actionType.value = eventType;

        if (value !== currentValue) {
          actualVal.value = value;
        }

        if (touchEnd.value) {
          hideTips(true);
        }
      }
    };

    const onSelect = (value: number) => {
      actualVal.value = value;
      hideTips();
    };

    return () => {
      const iconComponent = (n: number, value: number) => {
        const classPrefix = `${rateClass.value}__icon-left`;
        const select = value >= n;
        const selectHalf = Math.ceil(value) >= n;
        const SelectIcon = icon(select);
        const SelectHalfIcon = icon(selectHalf);
        return (
          <div style={{ fontSize: regSize(props.size) }}>
            {props.allowHalf ? (
              <div class={`${classPrefix} ${selectHalf ? `${classPrefix}--selected` : `${classPrefix}--unselected`}`}>
                {<SelectHalfIcon />}
              </div>
            ) : null}
            {<SelectIcon />}
          </div>
        );
      };

      const renderRateWrapper = () => {
        const countList = Array.from(Array(props.count), (_, k) => k + 1);
        return (
          <div
            ref={rateWrapper}
            class={`${rateClass.value}__wrapper`}
            onTouchstart={onTouchstart}
            onTouchmove={onTouchmove}
            onTouchend={onTouchEnd}
            onTouchcancel={onTouchEnd}
          >
            {countList.map((n) => {
              // 这里没有好的代替component组件的方法，用h函数代替
              return h(iconComponent(n, actualVal.value), {
                key: n,
                class: classes(n),
                style: { marginRight: `${props.count > n ? props.gap : 0}px`, ...colors.value },
                onClick,
              });
            })}
          </div>
        );
      };

      const renderRateText = () => {
        if (!props.showText) return null;
        return (
          <span
            class={{ [`${rateClass.value}__text`]: true, [`${rateClass.value}__text--active`]: actualVal.value > 0 }}
          >
            {rateText.value}
          </span>
        );
      };

      const renderRateTips = () => {
        if (!tipsVisible.value) return null;
        return (
          <div ref={ratePopoverRef} class={`${rateClass.value}__tips`} style={{ left: `${tipsLeft.value}px` }}>
            {actionType.value === 'tap' ? (
              <div style="display: flex">
                {props.allowHalf && (
                  <div
                    class={{
                      [`${rateClass.value}__tips-item`]: true,
                      [`${rateClass.value}__tips-item--active`]:
                        actualVal.value === Math.ceil(popoverValue.value) - 0.5,
                    }}
                    onClick={() => onSelect(Math.ceil(popoverValue.value) - 0.5)}
                  >
                    {h(iconComponent(Math.ceil(popoverValue.value), Math.ceil(popoverValue.value) - 0.5), {
                      style: { ...colors.value },
                      class: `${rateClass.value}__icon ${rateClass.value}__icon--unselected`,
                    })}
                    <span class={`${rateClass.value}__tips-text`}>{Math.ceil(popoverValue.value) - 0.5}</span>
                  </div>
                )}
                <div
                  class={{
                    [`${rateClass.value}__tips-item`]: true,
                    [`${rateClass.value}__tips-item--active`]:
                      props.allowHalf && actualVal.value === Math.ceil(popoverValue.value),
                  }}
                  onClick={() => onSelect(Math.ceil(popoverValue.value))}
                >
                  {h(iconComponent(Math.ceil(popoverValue.value), Math.ceil(popoverValue.value)), {
                    style: { ...colors.value },
                    class: `${rateClass.value}__icon ${rateClass.value}__icon--selected`,
                  })}
                  <span class={`${rateClass.value}__tips-text`}>{Math.ceil(popoverValue.value)}</span>
                </div>
              </div>
            ) : (
              <div class={`${rateClass.value}__tips-item`} onClick={() => onSelect(popoverValue.value)}>
                {h(iconComponent(Math.ceil(popoverValue.value), popoverValue.value), {
                  style: { ...colors.value },
                  class: {
                    [`${rateClass.value}__icon`]: true,
                    [`${rateClass.value}__icon--selected`]: Math.ceil(popoverValue.value) === popoverValue.value,
                    [`${rateClass.value}__icon--unselected`]: Math.ceil(popoverValue.value) !== popoverValue.value,
                  },
                })}
                <span class={`${rateClass.value}__tips-text`}>{popoverValue.value}</span>
              </div>
            )}
          </div>
        );
      };

      return (
        <div class={rootClasses.value}>
          {renderRateWrapper()}
          {renderRateText()}
          {renderRateTips()}
        </div>
      );
    };
  },
});
