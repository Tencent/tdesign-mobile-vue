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
    it(':showExtremeValue', async () => {
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

    it(':label', async () => {
      const value = 0;
      const wrapper = mount(Slider, {
        props: {
          label: true,
          showExtremeValue: true,
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

    it(':label with range', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: [0, 100],
          label: true,
          range: true,
          showExtremeValue: true,
          onChange,
        },
      });
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      
      await wrapper.setProps({ value: [0, 80]})

      expect(wrapper.vm.state.lineRight).toBe(68)

      // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    })

    it(':value out of limit', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const { round } = Math;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      const calcValue = (posX) => round((posX - left) / (right - left) * 100);
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: [-1, 101],
          onChange,
          range: true
        },
      });

      const $line = wrapper.find({ ref: 'sliderLine' })
      await $line.trigger('click', { clientX: 200 })
      expect(onChange).toHaveBeenCalledWith([0, calcValue(200)])

      await wrapper.setProps({ value: [-1, 101]})
      // // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
      // mock dot bounding client rect
      const $leftDot = wrapper.find({ ref: 'leftDot' });
      const $rightDot = wrapper.find({ ref: 'rightDot' });
      vi.spyOn($leftDot.wrapperElement, 'getBoundingClientRect').mockReturnValue({ left: 16 })
      vi.spyOn($rightDot.wrapperElement, 'getBoundingClientRect').mockReturnValue({ left: 359 })
      await $line.trigger('click', { clientX: 50 })
      expect(onChange).toHaveBeenLastCalledWith([calcValue(50), 100])
    })

    it(':capsule theme', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const clientX = 200;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          onChange,
          theme: 'capsule'
        },
      });
      
      const $line = wrapper.find({ ref: 'sliderLine' })
      
      await $line.trigger('click', { clientX })

      expect(onChange).toHaveBeenCalledWith(61)
      
      // // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    })
  });

  describe('event', () => {
    it(':change ', async () => {
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

    it('@click', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const clientX = 200;
      const { round } = Math;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      const calcValue = (posX) => round((posX - left) / (right - left) * 100);
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          onChange,
        },
      });
      
      const $line = wrapper.find({ ref: 'sliderLine' })
      const $dot = wrapper.find({ ref: 'singleDot' })

      await $line.trigger('click', { clientX })

      expect(onChange).toHaveBeenCalledWith(calcValue(clientX))
      
      await trigger($dot, 'touchmove', 100, 0);

      expect(onChange).toHaveBeenCalledWith(calcValue(100))

      // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    })

    it('@touch', async () => {
      const onChange = vi.fn();
      const { round } = Math;
      const left = 16;
      const right = 359;
      const original = window.HTMLElement.prototype.getBoundingClientRect;

      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: [0, 100],
          onChange,
          range: true
        },
      });
      
      const $leftDot = wrapper.find({ ref: 'leftDot' })
      const $rightDot = wrapper.find({ ref: 'rightDot' })
      
      await move($leftDot, 100);
      const leftValue = round((100 - left) / (right - left) * 100);
      expect(onChange).toHaveBeenCalledWith([leftValue, 100])

      await move($rightDot, 300)
      const rightValue = round((300 - left) / (right - left) * 100);
      expect(onChange).toHaveBeenCalledWith([0, rightValue])
      // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    })
  });
});
