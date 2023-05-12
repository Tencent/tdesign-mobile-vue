import { describe, it, expect, vi } from 'vitest';
import { getBackgroundColor } from '../utils';
import Progress from '../progress.vue';
import { mount } from '@vue/test-utils';

describe('Progress', () => {
  // jsdom 不支持 linear-gradient 等 css 样式 https://github.com/jsdom/jsdom/issues/2166
  //  这里对 getBackgroundColor 方法单独验证
  describe('utils/getBackgroundColor', () => {
    it('color types', () => {
      expect(getBackgroundColor('red')).toEqual('red');

      expect(getBackgroundColor(['#000', '#fff'])).toEqual('linear-gradient( 90deg,#000,#fff )');

      expect(
        getBackgroundColor({
          '0%': '#f00',
          '100%': '#0ff',
        }),
      ).toEqual('linear-gradient(to right, #f00 0%,#0ff 100%)');
    });
  });

  describe('props', () => {
    it(': color', async () => {
      const utils = await import('../utils');
      const wrapper = mount(Progress, {
        props: { color: 'orange' },
      });
      const percentBar = wrapper.find('.t-progress__inner');
      expect(getComputedStyle(percentBar.element).backgroundColor).toBe('orange');

      await wrapper.setProps({
        color: 'red',
      });
      expect(getComputedStyle(percentBar.element).backgroundColor).toBe('red');
    });

    it(': label', async () => {
      const wrapper = mount(Progress);
      expect(wrapper.find('.t-progress__info').exists()).toEqual(true);
      await wrapper.setProps({
        label: false,
      });
      expect(wrapper.find('.t-progress__info').exists()).toEqual(false);
    });

    it(': percentage', async () => {
      const wrapper = mount(Progress, {
        props: { percentage: 50 },
      });
      const percentBar = wrapper.find('.t-progress__inner');
      expect(getComputedStyle(percentBar.element).width).toBe('50%');
      await wrapper.setProps({
        percentage: 80,
      });
      expect(getComputedStyle(percentBar.element).width).toBe('80%');
    });

    it(': status', async () => {
      const wrapper = mount(Progress, {
        props: { status: 'success' },
      });
      const container = wrapper.find('.t-progress--thin');
      expect(container.classes()).toContain('t-progress--status--success');
    });

    it(': strokeWidth', async () => {
      const wrapper = mount(Progress, {
        props: { strokeWidth: 10 },
      });
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).height).toEqual('10px');
      await wrapper.setProps({
        strokeWidth: 8,
      });
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).height).toEqual('8px');
    });

    it(': trackColor', async () => {
      const wrapper = mount(Progress, {
        props: { trackColor: 'orange' },
      });
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).backgroundColor).toEqual('orange');
      await wrapper.setProps({
        trackColor: 'white',
      });
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).backgroundColor).toEqual('white');
    });
  });

  describe('slots', () => {
    it(': label', () => {
      const wrapper = mount(Progress, {
        slots: { label: '25%' },
      });
      expect(wrapper.find('.t-progress__info').text()).toEqual('25%');
    });
  });
});
