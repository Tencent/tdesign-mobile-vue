import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Progress from '../index';

describe('Progress', () => {
  describe('props', () => {
    it('color[string]', async () => {
      const wrapper = mount(Progress, {
        props: { color: 'orange' },
      });
      const percentBar = wrapper.find('.t-progress__inner');
      expect(getComputedStyle(percentBar.element).backgroundColor).toBe('orange');

      await wrapper.setProps({
        color: 'red',
      });
      expect(getComputedStyle(percentBar.element).backgroundColor).toBe('red');

      // 环形进度条：字符串颜色作为内环 svg 描边色输出
      const circleWrapper = mount(Progress, {
        props: { theme: 'circle', percentage: 50, color: 'orange' },
      });
      expect(getComputedStyle(circleWrapper.find('.t-progress__circle-inner').element).stroke).toBe('orange');
    });

    it('color[array]', () => {
      const wrapper = mount(Progress, {
        props: { percentage: 50, color: ['#000', '#fff'] },
      });
      const percentBar = wrapper.find('.t-progress__inner');
      // jsdom 不支持解析 linear-gradient 样式，渐变字串由 utils/getBackgroundColor 用例覆盖
      expect(percentBar.attributes('style')).toContain('width: 50%');
    });

    it('color[object]', () => {
      const wrapper = mount(Progress, {
        props: { percentage: 50, color: { '0%': '#f00', '100%': '#0ff' } },
      });
      const percentBar = wrapper.find('.t-progress__inner');
      // jsdom 不支持解析 linear-gradient 样式，渐变字串由 utils/getBackgroundColor 用例覆盖
      expect(percentBar.attributes('style')).toContain('width: 50%');
    });

    it('label[string]', () => {
      const wrapper = mount(Progress, {
        props: { label: 'loading...' },
      });
      expect(wrapper.find('.t-progress__info').text()).toEqual('loading...');
    });

    it('label[boolean]', async () => {
      // 默认 label 为 true，展示百分比文本
      const wrapper = mount(Progress);
      expect(wrapper.find('.t-progress__info').exists()).toEqual(true);
      expect(wrapper.find('.t-progress__info').text()).toEqual('0%');

      await wrapper.setProps({ label: false });
      expect(wrapper.find('.t-progress__info').exists()).toEqual(false);
    });

    it('label[function]', () => {
      const wrapper = mount(Progress, {
        props: { percentage: 50, label: () => <span class="custom-label">custom</span> },
      });
      expect(wrapper.find('.t-progress__info .custom-label').exists()).toEqual(true);
      expect(wrapper.find('.t-progress__info').text()).toEqual('custom');
    });

    it('label[slot]', () => {
      const wrapper = mount(Progress, {
        slots: { label: '25%' },
      });
      expect(wrapper.find('.t-progress__info').text()).toEqual('25%');
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

    it('size[string]', async () => {
      const wrapper = mount(Progress, {
        props: { theme: 'circle', percentage: 50 },
      });
      // 默认 default，直径 112
      expect(wrapper.find('.t-progress--circle').attributes('style')).toContain('width: 112px');
      expect(wrapper.find('svg').attributes('width')).toBe('112');

      // micro 尺寸直径 24，环宽默认收窄为 2
      await wrapper.setProps({ size: 'micro' });
      expect(wrapper.find('.t-progress--circle').attributes('style')).toContain('width: 24px');
      expect(wrapper.find('svg').attributes('width')).toBe('24');
      expect(wrapper.find('circle').attributes('stroke-width')).toBe('2');

      // 未声明的字符串取值回退为 default 直径 112
      await wrapper.setProps({ size: 'large' });
      expect(wrapper.find('.t-progress--circle').attributes('style')).toContain('width: 112px');
      expect(wrapper.find('svg').attributes('width')).toBe('112');
    });

    it('size[number]', async () => {
      const wrapper = mount(Progress, {
        props: { theme: 'circle', percentage: 50, size: 80 },
      });
      // 数值型 size 直接作为直径
      expect(wrapper.find('.t-progress--circle').attributes('style')).toContain('width: 80px');
      expect(wrapper.find('.t-progress--circle').attributes('style')).toContain('height: 80px');
      expect(wrapper.find('svg').attributes('width')).toBe('80');
      expect(wrapper.find('svg').attributes('height')).toBe('80');

      await wrapper.setProps({ size: 160 });
      expect(wrapper.find('.t-progress--circle').attributes('style')).toContain('width: 160px');
      expect(wrapper.find('svg').attributes('width')).toBe('160');
    });

    it.each(['success', 'error', 'warning', 'active'] as const)('status[%s]', (status) => {
      const wrapper = mount(Progress, { props: { percentage: 30, status } });
      expect(wrapper.find('.t-progress--thin').classes()).toContain(`t-progress--status-${status}`);
    });

    it('status[default]', () => {
      const wrapper = mount(Progress, { props: { percentage: 30 } });
      expect(wrapper.find('.t-progress--thin').classes()).toContain('t-progress--status-default');
    });

    it('strokeWidth[string]', async () => {
      const wrapper = mount(Progress, {
        props: { strokeWidth: '12px' },
      });
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).height).toEqual('12px');

      // 环形进度条线宽仅支持数值，字符串输入回退为默认环宽 6
      const circleWrapper = mount(Progress, {
        props: { theme: 'circle', percentage: 50, strokeWidth: '12px' },
      });
      expect(circleWrapper.find('circle').attributes('stroke-width')).toBe('6');
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

      // 环形进度条：未设置时默认环宽 6，设置为数值后按数值输出
      const circleWrapper = mount(Progress, {
        props: { theme: 'circle', percentage: 50 },
      });
      expect(circleWrapper.find('circle').attributes('stroke-width')).toBe('6');
      await circleWrapper.setProps({ strokeWidth: 10 });
      expect(circleWrapper.find('circle').attributes('stroke-width')).toBe('10');
    });

    // 源码未实现：props.ts 注明 strokeWidth「宽度数值不能超过 size 的一半，否则不能输出环形进度」，
    // 但 getCircleStokeWidth 未实现该限制，超过 size/2 时环形进度仍会照常输出，待源码补充后再验收
    it.todo('strokeWidth[number] does not render circle progress when exceeding half of size');

    it.each(['line', 'plump', 'circle'] as const)('theme[%s]', (theme) => {
      const wrapper = mount(Progress, { props: { percentage: 50, theme } });
      if (theme === 'line') expect(wrapper.find('.t-progress--thin').exists()).toBe(true);
      if (theme === 'plump') expect(wrapper.find('.t-progress__bar').classes()).toContain('t-progress--plump');
      if (theme === 'circle') {
        expect(wrapper.find('.t-progress--circle').exists()).toBe(true);
        expect(wrapper.find('svg').exists()).toBe(true);
      }
      expect(wrapper.text()).toBe('50%');
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

      // 环形进度条：轨道颜色作为外环 svg 描边色输出
      const circleWrapper = mount(Progress, {
        props: { theme: 'circle', percentage: 50, trackColor: 'orange' },
      });
      expect(getComputedStyle(circleWrapper.find('.t-progress__circle-outer').element).stroke).toEqual('orange');
    });
  });
});
