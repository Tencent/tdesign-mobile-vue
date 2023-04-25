import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Slider from '../slider.vue';
import { trigger } from '../../image-viewer/__test__/touch';

const classPrefix = 't-slider';
const move = async (target, distance) => {
  await trigger(target, 'touchstart', 0, 0);
  await trigger(target, 'touchmove', distance, 0);
  await trigger(target, 'touchend', distance, 0);
};

describe('slider', () => {
  describe('props', () => {
    it(': showExtremeValue', async () => {
      const value = [30, 70];
      const showExtremeValue = true;
      const wrapper = mount(Slider, {
        props: {
          label: false,
          value,
          showExtremeValue,
        },
      });
      const $left = wrapper.find(`.${classPrefix}__value--min`);
      const $right = wrapper.find(`.${classPrefix}__value--max`);

      // min = 0, max = 100 (默认)
      expect(Number($left.text())).toStrictEqual(0);
      expect(Number($right.text())).toStrictEqual(100);

      const newMin = 30;
      const newMax = 110;
      await wrapper.setProps({
        min: newMin,
        max: newMax,
      });
      expect(Number($left.text())).toStrictEqual(newMin);
      expect(Number($right.text())).toStrictEqual(newMax);
    });

    it(': label', async () => {
      const value = 0;
      const wrapper = mount(Slider, {
        props: {
          label: true,
          value,
        },
      });

      // min = 0, max = 100, label = true (默认)
      // label && 滑块条
      const $label = wrapper.find(`.${classPrefix}__dot-value`);
      const $bar = wrapper.findAll(`.${classPrefix}__line`);
      expect(Number($label.text())).toEqual(value);
      const newValue = 30;
      await wrapper.setProps({
        value: newValue,
      });
      expect(Number($label.text())).toEqual(newValue);
    });
  });

  describe('event', () => {
    it(': change ', async () => {
      const onChange = vi.fn();
      const value = 0;
      const disabled = true;
      const wrapper = mount(Slider, {
        props: {
          value,
          disabled,
          onChange,
        },
      });
      const $bar = wrapper.find(`.${classPrefix}__bar`);

      // disabled = true, 禁止滑动
      await move($bar, 120);
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});
