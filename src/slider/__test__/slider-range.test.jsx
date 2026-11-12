import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Slider from '../slider';

describe('Slider', () => {
  describe('range', () => {
    it('renders without throwing when range is set and no value is given', () => {
      const wrapper = mount(Slider, { props: { range: true } });
      expect(wrapper.find('.t-slider').exists()).toBe(true);
    });

    it('defaults to the full range when range is set and no value is given', () => {
      const wrapper = mount(Slider, { props: { range: true, min: 10, max: 60 } });
      const dots = wrapper.findAll('.t-slider__dot');
      expect(dots.length).toBe(2);
    });

    it('keeps an explicit array defaultValue', () => {
      const wrapper = mount(Slider, { props: { range: true, defaultValue: [20, 30] } });
      expect(wrapper.find('.t-slider').exists()).toBe(true);
    });
  });
});
