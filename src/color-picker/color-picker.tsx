import { defineComponent, ref, watch, computed, onMounted, nextTick, toRefs } from 'vue';
import props from './props';
import config from '../config';
import { Popup as TPopup } from '../popup';
import type { ColorPickerChangeTrigger } from './type';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import useVModel from '../hooks/useVModel';
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
  setup(props) {
    const colorPickerClass = usePrefixClass('color-picker');
    const panelRect = ref<HTMLElement>();
    const hueSliderRect = ref<HTMLElement>();
    const alphaSliderRect = ref<HTMLElement>();
    const { value, modelValue } = toRefs(props);

    const [innerValue = ref(DEFAULT_COLOR), setPickerValue] = useVModel(
      value,
      modelValue,
      props.defaultValue,
      props.onChange,
    );

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
    const formatList = ref<[string, Array<string | number>]>(getFormatList(props.format, color));
    const innerSwatchList = computed(() => genSwatchList(props.swatchColors));

    const renderTNodeJSX = useTNodeJSX();

    const getSliderThumbStyle = ({ value, maxValue }: { value: number; maxValue: number }) => {
      const dom = hueSliderRect.value;
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
        const hue = getSliderThumbStyle({ value: color.hue, maxValue: HUE_MAX });
        if (hue) {
          hueSliderStyle.value = hue;
        }
        const alpha = getSliderThumbStyle({ value: color.alpha * 100, maxValue: ALPHA_MAX });
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
      setPickerValue?.(formatValue(), {
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
      if (value !== val && saturation !== sat) {
        color.saturation = saturation;
        color.value = value;
      } else if (saturation !== sat) {
        color.saturation = saturation;
      } else if (value !== val) {
        color.value = value;
      } else {
        return;
      }

      props.onPaletteBarChange?.({
        color: getColorObject(color),
      });

      setCoreStyle();
    };

    const handleSaturationDrag = (e: TouchEvent) => {
      const coordinate = getCoordinate(e, panelRect.value.getBoundingClientRect(), props.fixed);

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

      const value = Math.min(maxValue, Math.max(0, Math.round((x / width) * maxValue * 100) / 100));
      onChangeSlider({ value, isAlpha });
    };

    const handleDiffDrag = (e: TouchEvent, dragType: 'saturation' | 'hue-slider' | 'alpha-slider') => {
      e.preventDefault();
      e.stopPropagation();
      const callbackMap = {
        saturation: () => handleSaturationDrag(e),
        'hue-slider': () => handleSliderDrag(e),
        'alpha-slider': () => handleSliderDrag(e, true),
      };

      callbackMap[dragType]?.();
    };

    const onTouchStart = (e: TouchEvent, dragType: 'saturation' | 'hue-slider' | 'alpha-slider') => {
      handleDiffDrag(e, dragType);
    };

    const onTouchMove = (e: TouchEvent, dragType: 'saturation' | 'hue-slider' | 'alpha-slider') => {
      handleDiffDrag(e, dragType);
    };

    const onTouchEnd = (e: TouchEvent, dragType: 'saturation' | 'hue-slider' | 'alpha-slider') => {
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
      const { type, format, enableAlpha } = props;

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
                  {formatList.value[0]}
                </div>
                <div class={`${colorPickerClass.value}__format-item ${colorPickerClass.value}__format-item--second`}>
                  <div class={`${colorPickerClass.value}__format-inputs`}>
                    {formatList.value[1].map((formatItem, formatIndex) => (
                      <div
                        class={`${colorPickerClass.value}__format-input ${colorPickerClass.value}__format-input--${formatIndex === formatList.value[1].length - 1 && formatList.value[1].length === 2 ? 'fixed' : 'base'}`}
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
      return inner;
    };
  },
});
