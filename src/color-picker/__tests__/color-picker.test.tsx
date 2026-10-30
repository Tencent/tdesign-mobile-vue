import { describe, it, expect, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import ColorPicker from '../index';
import { getColorObject, Color } from '../../_common/js/color-picker';

const commonProps = {};

const mountColorPicker = (props) =>
  mount(ColorPicker, {
    props: { ...commonProps, ...props },
  });

const makeTouch = (el, eventName, touchPosition) => {
  const event = new Event(eventName);
  if (touchPosition) {
    event.changedTouches = [touchPosition];
  }

  el.dispatchEvent(event);
};

const mockBoundingClientRect = (info) => {
  window.HTMLElement.prototype.getBoundingClientRect = () => info;
};

describe('ColorPicker', () => {
  describe('props', () => {
    // clearable 文档声明但实现未消费该属性（组件缺口），待组件支持后再补
    it.todo('clearable[boolean]');

    it('enableAlpha[boolean]', () => {
      const testEnableAlpha = (enableAlpha) => {
        const wrapper = mountColorPicker({ enableAlpha, type: 'multiple' });
        const alphaDom = wrapper.findAll('.t-color-picker__slider-wrapper--alpha-type');
        expect(alphaDom).toHaveLength(enableAlpha ? 1 : 0);
      };
      testEnableAlpha();
      testEnableAlpha(true);
    });

    it('fixed[boolean]', () => {
      // 弹层在 position:fixed 区域时，触控纵坐标需改用 clientY 计算
      const testFixed = (fixed: boolean, expectedValue: number) => {
        const onPaletteBarChange = vi.fn();
        const wrapper = mountColorPicker({ type: 'multiple', fixed, onPaletteBarChange });
        mockBoundingClientRect({
          left: 0,
          top: 0,
          width: 100,
          height: 100,
        });
        const el = wrapper.find('.t-color-picker__saturation').element;
        // pageY = 90、clientY = 10 两个坐标差异明显，用于区分两种取值来源
        makeTouch(el, 'touchend', { pageX: 50, pageY: 90, clientY: 10 });

        expect(onPaletteBarChange).toHaveBeenCalledTimes(1);
        const { color } = onPaletteBarChange.mock.lastCall[0];
        expect(color.saturation).toBe(0.5);
        expect(color.value).toBeCloseTo(expectedValue);
      };
      // 非 fixed：按 pageY 计算，value = 1 - 90/100 = 0.1
      testFixed(false, 0.1);
      // fixed：按 clientY 计算，value = 1 - 10/100 = 0.9
      testFixed(true, 0.9);
    });

    it('format[RGB/HEX]', () => {
      const testFormat = (format, target) => {
        const wrapper = mountColorPicker({ format, type: 'multiple' });
        const dom = wrapper.find('.t-color-picker__format-item--first');
        expect(dom.element.innerHTML).toBe(target);
      };
      testFormat('RGB', 'RGB');
      testFormat('HEX', 'HEX');
    });

    it('swatchColors[array]', () => {
      const testSwatchColors = (swatchColors, target) => {
        const wrapper = mountColorPicker({ swatchColors });
        const dom = wrapper.findAll('.t-color-picker__swatches-item');
        expect(dom).toHaveLength(target);
      };
      testSwatchColors(null, 0);
      testSwatchColors([], 0);
      testSwatchColors(undefined, 10);
      testSwatchColors(['red', 'blur'], 2);
    });

    it('type[base/multiple]', () => {
      // base 仅展示系统预设内容；multiple 额外渲染色板（饱和度面板）
      const testType = (type, target) => {
        const wrapper = mountColorPicker({ type });
        // 未传 type 时默认 base
        expect(wrapper.find('.t-color-picker__body').classes()).toContain(`t-color-picker__body--${type || 'base'}`);
        const dom = wrapper.findAll('.t-color-picker__saturation');
        expect(dom).toHaveLength(target);
      };
      testType(undefined, 0);
      testType('base', 0);
      testType('multiple', 1);
    });

    // 受控色值 v-model 联动
    it('modelValue[string]', async () => {
      const value = ref('#FF0000');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => <ColorPicker v-model={value.value} type="multiple" format="RGB" onChange={onChange} />;
        },
      });
      await nextTick();
      // modelValue 决定色板初始色值（RGB 通道展示 255/0/0）
      const getFormatTexts = () => wrapper.findAll('.t-color-picker__format-input').map((item) => item.text());
      expect(getFormatTexts()).toEqual(['255', '0', '0', '100%']);

      // 点击系统预设色后 v-model 联动更新
      await wrapper.find('.t-color-picker__swatches-item').trigger('click');
      expect(onChange).toHaveBeenCalledWith('rgb(236, 242, 254)', expect.anything());
      expect(value.value).toBe('rgb(236, 242, 254)');
      expect(getFormatTexts()).toEqual(['236', '242', '254', '100%']);
    });

    it('defaultValue[string]', async () => {
      const wrapper = mountColorPicker({ type: 'multiple', format: 'RGB', defaultValue: '#00FF00' });
      // defaultValue 作为非受控初始色值（RGB 通道展示 0/255/0）
      expect(wrapper.findAll('.t-color-picker__format-input').map((item) => item.text())).toEqual([
        '0',
        '255',
        '0',
        '100%',
      ]);
    });
  });

  describe('events', () => {
    it('preset change', async () => {
      const onChange = vi.fn();
      const wrapper = mountColorPicker({ onChange });
      const swatch = wrapper.find('.t-color-picker__swatches-item');
      await swatch.trigger('click');

      const result = 'rgb(236, 242, 254)';
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(result, {
        trigger: 'preset',
        color: getColorObject(new Color(result)),
      });
    });

    it('saturation change', async () => {
      const testSaturation = async (fixed) => {
        const onPaletteBarChange = vi.fn();
        const wrapper = mountColorPicker({ onPaletteBarChange, type: 'multiple', fixed });
        const el = wrapper.find('.t-color-picker__saturation').element;
        mockBoundingClientRect({
          left: 0,
          top: 0,
          width: 300,
          height: 50,
        });
        makeTouch(el, 'touchstart');
        makeTouch(el, 'touchmove', { pageY: 40, pageX: 0, clientY: 40 });
        makeTouch(el, 'touchmove', { pageY: 30, pageX: 0, clientY: 30 });
        makeTouch(el, 'touchend', { pageY: 30, pageX: 30, clientY: 20 });

        expect(onPaletteBarChange).toHaveBeenCalledTimes(4);
        const result = 'rgba(46, 47, 51, 1)';
        const color = new Color(result);
        color.saturation = 0.1;
        color.value = fixed ? 0.6 : 0.4;
        // TODO: error
        // expect(onPaletteBarChange).toHaveBeenLastCalledWith({
        //   color: getColorObject(color),
        // });
      };

      testSaturation();
      testSaturation(true);
    });

    it('hue slider change', async () => {
      const onChange = vi.fn();
      const wrapper = mountColorPicker({ onChange, type: 'multiple' });
      const el = wrapper.find('.t-color-picker__slider').element;
      mockBoundingClientRect({
        left: 0,
        top: 0,
        width: 300,
        height: 50,
      });
      makeTouch(el, 'touchstart', { pageY: 0, pageX: 0, clientY: 30 });
      makeTouch(el, 'touchmove', { pageY: 30, pageX: 0, clientY: 30 });
      makeTouch(el, 'touchend', { pageY: 30, pageX: 40, clientY: 30 });

      expect(onChange).toHaveBeenCalledTimes(3);
      const result = 'rgb(151, 121, 0)';
      expect(onChange).toHaveBeenLastCalledWith(result, {
        trigger: 'palette-hue-bar',
        color: getColorObject(new Color(result)),
      });
    });

    it('alpha slider change', async () => {
      const onChange = vi.fn();
      const wrapper = mountColorPicker({ onChange, type: 'multiple', enableAlpha: true });
      const el = wrapper.find('.t-color-picker__slider-wrapper--alpha-type .t-color-picker__slider').element;
      mockBoundingClientRect({
        left: 0,
        top: 0,
        width: 300,
        height: 50,
      });
      makeTouch(el, 'touchstart', { pageY: 0, pageX: 0, clientY: 30 });
      makeTouch(el, 'touchmove', { pageY: 30, pageX: 0, clientY: 30 });
      makeTouch(el, 'touchend', { pageY: 30, pageX: 40, clientY: 30 });

      expect(onChange).toHaveBeenCalledTimes(3);
      const result = 'rgb(0, 31, 151)';
      const color = new Color(result);
      color.alpha = 0.13;
      expect(onChange).toHaveBeenLastCalledWith(result, {
        trigger: 'palette-alpha-bar',
        color: getColorObject(color),
      });
    });
  });
});
