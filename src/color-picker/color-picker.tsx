import { defineComponent, ref, watch, computed, onMounted, nextTick } from 'vue';
import props from './props';
import config from '../config';
import { Popup as TPopup } from '../popup';
import { useTNodeJSX } from '../hooks/tnode';
import type { ColorPickerTrigger, ColorPickerChangeTrigger } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { getFormatList, genSwatchList, getCoordinate } from './helper';
import { Color, getColorObject } from '../_common/js/color-picker';
import { DEFAULT_COLOR } from '../_common/js/color-picker/constants';
import { ALPHA_MAX, HUE_MAX } from './constants';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-color-picker`,
  components: {
    TPopup,
  },
  props,
  setup(props, { slots }) {
    const colorPickerClass = usePrefixClass('color-picker');
    const innerVisible = ref(props.visible);
    const panelRect = ref<HTMLElement>();
    const hueSliderRect = ref<HTMLElement>();
    const alphaSliderRect = ref<HTMLElement>();
    const innerValue = ref(props.value);

    const saturationThumbStyle = ref({
      left: '0',
      top: '0',
    });
    const hueSliderStyle = ref({
      left: '0',
      color: '',
    });
    const alphaSliderStyle = ref({
      left: '0',
      color: '',
    });
    const sliderInfo = ref({
      value: 0,
    });
    const color = new Color(props.defaultValue || props.value || DEFAULT_COLOR);
    const formatList = ref(getFormatList(props.format, color));
    const innerSwatchList = computed(() => genSwatchList(props.swatchColors));

    watch(
      () => props.visible,
      (value) => {
        innerVisible.value = value;
        nextTick(() => {
          init();
        });
      },
    );

    const renderTNodeJSX = useTNodeJSX();
    const close = (trigger: ColorPickerTrigger) => {
      if (props.autoClose) {
        innerVisible.value = false;
      }

      props.onClose(trigger);
    };

    const onVisibleChange = (visible: boolean, trigger: ColorPickerTrigger) => {
      if (!visible) {
        close(trigger);
      }
    };

    const getSliderThumbStyle = ({
      value,
      maxValue,
      isAlpha,
    }: {
      value: number;
      maxValue: number;
      isAlpha?: boolean;
    }) => {
      const dom = isAlpha ? alphaSliderRect.value : hueSliderRect.value;
      const { width } = dom.getBoundingClientRect();
      if (!width) {
        return;
      }

      const left = Math.round((value / maxValue) * 100);

      return {
        left: `${left}%`,
        color: color.rgb,
      };
    };

    const getSaturationThumbStyle = ({ saturation, value }: { saturation: number; value: number }) => {
      const { width, height } = panelRect.value.getBoundingClientRect();
      const top = Math.round((1 - value) * height);
      const left = Math.round(saturation * width);

      return {
        color: color.rgb,
        left: `${left}px`,
        top: `${top}px`,
      };
    };

    const setCoreStyle = () => {
      sliderInfo.value = { value: color.hue };
      formatList.value = getFormatList(props.format, color);
      if (isMultiple.value) {
        const hue = getSliderThumbStyle({ value: color.hue, maxValue: HUE_MAX, isAlpha: false });
        if (hue) {
          hueSliderStyle.value = hue;
        }
        const alpha = getSliderThumbStyle({ value: color.alpha * 100, maxValue: ALPHA_MAX, isAlpha: false });
        if (alpha) {
          alphaSliderStyle.value = alpha;
        }

        saturationThumbStyle.value = getSaturationThumbStyle({
          saturation: color.saturation,
          value: color.value,
        });
      }
    };
    const formatValue = () => {
      return color.getFormatsColorMap()[props.format] || color.css;
    };

    const emitColorChange = (trigger: ColorPickerChangeTrigger) => {
      props.onChange?.(formatValue(), {
        trigger,
        color: getColorObject(color),
      });
    };

    const clickSwatch = (swatch: string) => {
      color.update(swatch);
      emitColorChange('preset');
      setCoreStyle();
    };
    const isMultiple = computed(() => {
      return props.type === 'multiple';
    });

    const getSaturationAndValueByCoordinate = (coordinate: { x: number; y: number }) => {
      const { width, height } = panelRect.value.getBoundingClientRect();
      const { x, y } = coordinate;
      let saturation = x / width;
      let value = 1 - y / height;
      saturation = Math.min(1, Math.max(0, saturation));
      value = Math.min(1, Math.max(0, value));

      return {
        saturation,
        value,
      };
    };

    const onChangeSaturation = ({ saturation, value }: { saturation: number; value: number }) => {
      const { saturation: sat, value: val } = color;
      let changeTrigger: ColorPickerChangeTrigger = 'palette-saturation-brightness';
      if (value !== val && saturation !== sat) {
        color.saturation = saturation;
        color.value = value;
        changeTrigger = 'palette-saturation-brightness';
      } else if (saturation !== sat) {
        color.saturation = saturation;
        changeTrigger = 'palette-saturation';
      } else if (value !== val) {
        color.value = value;
        changeTrigger = 'palette-brightness';
      } else {
        return;
      }

      props.onPaletteBarChange?.({
        color: getColorObject(color),
      });

      emitColorChange(changeTrigger);
      setCoreStyle();
    };

    const handleSaturationDrag = (e: TouchEvent) => {
      const coordinate = getCoordinate(e, panelRect.value.getBoundingClientRect());

      const { saturation, value } = getSaturationAndValueByCoordinate(coordinate);

      onChangeSaturation({ saturation, value });
    };

    const onChangeSlider = ({ value, isAlpha }: { value: number; isAlpha: boolean }) => {
      if (isAlpha) {
        color.alpha = value / 100;
      } else {
        color.hue = value;
      }

      emitColorChange(isAlpha ? 'palette-alpha-bar' : 'palette-hue-bar');

      setCoreStyle();
    };

    const handleSliderDrag = (e: TouchEvent, isAlpha = false) => {
      const dom = isAlpha ? alphaSliderRect.value : hueSliderRect.value;
      const rect = dom.getBoundingClientRect();

      const { width } = rect;
      const coordinate = getCoordinate(e, rect);
      const { x } = coordinate;
      const maxValue = isAlpha ? ALPHA_MAX : HUE_MAX;

      let value = Math.round((x / width) * maxValue * 100) / 100;
      if (value < 0) value = 0;
      if (value > maxValue) value = maxValue;
      onChangeSlider({ value, isAlpha });
    };

    const handleDiffDrag = (e: TouchEvent, dragType: string) => {
      e.preventDefault();
      e.stopPropagation();

      switch (dragType) {
        case 'saturation':
          handleSaturationDrag(e);
          break;
        case 'hue-slider':
          handleSliderDrag(e);
          break;
        case 'alpha-slider':
          handleSliderDrag(e, true);
          break;
        default:
          break;
      }
    };

    const onTouchStart = (e: TouchEvent, dragType: string) => {
      handleDiffDrag(e, dragType);
    };

    const onTouchMove = (e: TouchEvent, dragType: string) => {
      handleDiffDrag(e, dragType);
    };

    const onTouchEnd = (e: TouchEvent, dragType: string) => {
      handleDiffDrag(e, dragType);
    };

    const updateColor = () => {
      const result = innerValue.value || DEFAULT_COLOR;
      color.update(result);
    };

    const init = () => {
      updateColor();
      setCoreStyle();
    };

    onMounted(() => {
      init();
    });

    return () => {
      const { usePopup, type, popupProps, format, enableAlpha } = props;

      const header = renderTNodeJSX('header');
      const footer = renderTNodeJSX('footer');

      const inner = (
        <div class={`${colorPickerClass.value}__panel`}>
          <div class={`${colorPickerClass.value}__body ${colorPickerClass.value}__body--${type}`}>
            {isMultiple.value && (
              <div
                ref={panelRect}
                class={`${colorPickerClass.value}__saturation`}
                style={{ background: `hsl(${sliderInfo.value.value}, 100%, 50%)` }}
                onTouchstart={(e) => onTouchStart(e, 'saturation')}
                onTouchmove={(e) => onTouchMove(e, 'saturation')}
                onTouchend={(e) => onTouchEnd(e, 'saturation')}
              >
                <div class={`${colorPickerClass.value}__thumb`} style={saturationThumbStyle.value}></div>
              </div>
            )}

            {isMultiple.value && (
              <div class={`${colorPickerClass.value}__sliders-wrapper`}>
                <div class={`${colorPickerClass.value}__sliders`}>
                  <div
                    class={`${colorPickerClass.value}__slider-wrapper ${colorPickerClass.value}__slider-wrapper--hue-type`}
                  >
                    <div
                      class={`${colorPickerClass.value}__slider`}
                      ref={hueSliderRect}
                      onTouchstart={(e) => onTouchStart(e, 'hue-slider')}
                      onTouchmove={(e) => onTouchMove(e, 'hue-slider')}
                      onTouchend={(e) => onTouchEnd(e, 'hue-slider')}
                    >
                      <div class={`${colorPickerClass.value}__rail`}></div>
                      <div class={`${colorPickerClass.value}__thumb`} style={hueSliderStyle.value}></div>
                    </div>
                  </div>

                  {enableAlpha && (
                    <div
                      class={`${colorPickerClass.value}__slider-wrapper ${colorPickerClass.value}__slider-wrapper--alpha-type`}
                    >
                      <div class={`${colorPickerClass.value}__slider-padding `}></div>
                      <div
                        class={`${colorPickerClass.value}__slider`}
                        ref={alphaSliderRect}
                        onTouchstart={(e) => onTouchStart(e, 'alpha-slider')}
                        onTouchmove={(e) => onTouchMove(e, 'alpha-slider')}
                        onTouchend={(e) => onTouchEnd(e, 'alpha-slider')}
                      >
                        <div
                          class={`${colorPickerClass.value}__rail`}
                          style={{
                            background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${alphaSliderStyle.value?.color})`,
                          }}
                        ></div>
                        <div class={`${colorPickerClass.value}__thumb`} style={alphaSliderStyle.value}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {isMultiple.value && (
              <div class={`${colorPickerClass.value}__format`}>
                <div class={`${colorPickerClass.value}__format-item ${colorPickerClass.value}__format-item--first`}>
                  {format}
                </div>
                <div class={`${colorPickerClass.value}__format-item ${colorPickerClass.value}__format-item--second`}>
                  <div class={`${colorPickerClass.value}__format-inputs`}>
                    {formatList.value.map((formatItem, formatIndex) => (
                      <div
                        class={`${colorPickerClass.value}__format-input ${colorPickerClass.value}__format-input--${formatIndex === formatList.value.length - 1 && formatList.value.length === 2 ? 'fixed' : 'base'}`}
                        key={formatIndex}
                      >
                        {formatItem}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {innerSwatchList.value.length && (
              <div class={`${colorPickerClass.value}__swatches-wrap`}>
                <div class={`${colorPickerClass.value}__swatches`}>
                  {isMultiple.value && <div class={`${colorPickerClass.value}__swatches-title`}>系统预设色彩</div>}
                  <div class={`${colorPickerClass.value}__swatches-items`}>
                    {innerSwatchList.value.map((swatch) => (
                      <div
                        class={`${colorPickerClass.value}__swatches-item`}
                        key={swatch}
                        onClick={() => clickSwatch(swatch)}
                      >
                        <div
                          class={`${colorPickerClass.value}__swatches-inner`}
                          style={{ backgroundColor: swatch }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
      if (usePopup) {
        return (
          <t-popup {...popupProps} visible={innerVisible.value} placement="bottom" onVisibleChange={onVisibleChange}>
            {header}
            {inner}
            {footer}
          </t-popup>
        );
      }
      return inner;
    };
  },
});
