import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Progress from '../index';
import type { TdProgressProps } from '../type';

describe('Progress', () => {
  describe('props', () => {
    it('color[string]', async () => {
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

    it('color[object]', async () => {
      const utils = await import('../utils');
      const wrapper = mount(Progress, {
        props: { percentage: 50, color: { '0%': '#f00', '100%': '#0ff' } },
      });
      const percentBar = wrapper.find('.t-progress__inner');
      // jsdom 不支持解析 linear-gradient 样式，渐变字串由 utils/getBackgroundColor 用例覆盖
      expect(percentBar.attributes('style')).toContain('width: 50%');
    });

    it('color[array]', async () => {
      const utils = await import('../utils');
      const wrapper = mount(Progress, {
        props: { percentage: 50, color: ['#000', '#fff'] },
      });
      const percentBar = wrapper.find('.t-progress__inner');
      // jsdom 不支持解析 linear-gradient 样式，渐变字串由 utils/getBackgroundColor 用例覆盖
      expect(percentBar.attributes('style')).toContain('width: 50%');
    });

    it('label[boolean]', async () => {
      const wrapper = mount(Progress);
      expect(wrapper.find('.t-progress__info').exists()).toEqual(true);
      await wrapper.setProps({
        label: false,
      });
      expect(wrapper.find('.t-progress__info').exists()).toEqual(false);
    });

    it('label[string]', async () => {
      const wrapper = mount(Progress, {
        props: { label: 'loading...' },
      });
      expect(wrapper.find('.t-progress__info').text()).toEqual('loading...');
    });

    it('label[function]', async () => {
      const wrapper = mount(Progress, {
        props: { label: () => '50%' },
      });
      expect(wrapper.find('.t-progress__info').text()).toEqual('50%');
    });

    it('percentage[number]', async () => {
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

    it('status[string]', async () => {
      const statusList: TdProgressProps['status'][] = [undefined, 'success', 'error', 'warning', 'active'];
      const statusListResult = ['default', 'success', 'error', 'warning', 'active'];
      statusList.forEach((status, index) => {
        const wrapper = mount(() => <Progress percentage={30} status={status} />);
        const thin = wrapper.find('.t-progress--thin');
        expect(thin.classes()).toContain(`t-progress--status-${statusListResult[index]}`);
      });
    });

    it('strokeWidth[number]', async () => {
      const wrapper = mount(Progress, {
        props: { strokeWidth: 10 },
      });
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).height).toEqual('10px');
      await wrapper.setProps({
        strokeWidth: 8,
      });
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).height).toEqual('8px');
    });

    it('strokeWidth[string]', async () => {
      const wrapper = mount(Progress, {
        props: { strokeWidth: '12px' },
      });
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).height).toEqual('12px');
    });

    it('trackColor[string]', async () => {
      const wrapper = mount(Progress, {
        props: { trackColor: 'orange' },
      });
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).backgroundColor).toEqual('orange');
      await wrapper.setProps({
        trackColor: 'white',
      });
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).backgroundColor).toEqual('white');
    });

    it('theme[line/plump/circle]', async () => {
      // 默认 line（thin 形态）
      const wrapper = mount(Progress, {
        props: { percentage: 50 },
      });
      expect(wrapper.find('.t-progress--thin').exists()).toBe(true);
      expect(wrapper.text()).toBe('50%');

      const wrapper2 = mount(Progress, {
        props: { percentage: 50, theme: 'plump' },
      });
      expect(wrapper2.find('.t-progress__bar').classes()).toContain('t-progress--plump');
      expect(wrapper2.text()).toBe('50%');

      const wrapper3 = mount(Progress, {
        props: { percentage: 50, theme: 'circle' },
      });
      expect(wrapper3.find('.t-progress--circle').exists()).toBe(true);
    });
  });

  describe('slots', () => {
    it('label', () => {
      const wrapper = mount(Progress, {
        slots: { label: '25%' },
      });
      expect(wrapper.find('.t-progress__info').text()).toEqual('25%');
    });

    // size 进度条粗细尺寸
    it.todo('size[string]');
    it.todo('size[number]');
  });
});
