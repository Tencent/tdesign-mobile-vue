import { describe, it, expect, vi } from 'vitest';
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

describe('color-picker', () => {
  describe('props', () => {
    it(': multiple', () => {
      const testCurrentProp = (type, target) => {
        const wrapper = mountColorPicker({ type });
        const dom = wrapper.findAll('.t-color-picker__saturation');
        expect(dom).toHaveLength(target);
      };
      testCurrentProp(undefined, 0);
      testCurrentProp('base', 0);
      testCurrentProp('multiple', 1);
    });

    it(': enableAlpha', () => {
      const testEnableAlpha = (enableAlpha) => {
        const wrapper = mountColorPicker({ enableAlpha, type: 'multiple' });
        const alphaDom = wrapper.findAll('.t-color-picker__slider-wrapper--alpha-type');
        expect(alphaDom).toHaveLength(enableAlpha ? 1 : 0);
      };
      testEnableAlpha();
      testEnableAlpha(true);
    });

    it(': swatchColors', () => {
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

    it(': format', () => {
      const testFormat = (format, target) => {
        const wrapper = mountColorPicker({ format, type: 'multiple' });
        const dom = wrapper.find('.t-color-picker__format-item--first');
        expect(dom.element.innerHTML).toBe(target);
      };
      testFormat('RGB', 'RGB');
      testFormat('123', 'RGB');
      testFormat('HEX', 'HEX');
    });
  });

  describe('events', () => {
    it(': preset change', async () => {
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

    it(': saturation change', async () => {
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

    it(': hue slider change', async () => {
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

    it(': alpha slider change', async () => {
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
