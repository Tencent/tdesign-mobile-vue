import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Progress from '../index';
import type { TdProgressProps } from '../type';

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

  describe('scenarios', () => {
    describe('status icon display', () => {
      it.each([
        ['success', 't-icon-check-circle-filled'],
        ['error', 't-icon-error-circle-filled'],
        ['warning', 't-icon-error-circle-filled'],
      ] as const)('renders filled icon for line theme with %s status', (status, iconClass) => {
        const wrapper = mount(Progress, { props: { percentage: 30, status } });
        expect(wrapper.find('.t-progress__info .t-progress__icon').exists()).toBe(true);
        expect(wrapper.find(`.t-progress__icon.${iconClass}`).exists()).toBe(true);
        expect(wrapper.text()).not.toContain('30%');
      });

      it.each([
        ['success', 't-icon-check'],
        ['error', 't-icon-close'],
        ['warning', 't-icon-error'],
      ] as const)('renders stroke icon for circle theme with %s status', (status, iconClass) => {
        const wrapper = mount(Progress, { props: { theme: 'circle', percentage: 30, status } });
        expect(wrapper.find('.t-progress__info .t-progress__icon').exists()).toBe(true);
        expect(wrapper.find(`.t-progress__icon.${iconClass}`).exists()).toBe(true);
        expect(wrapper.text()).not.toContain('30%');
      });

      it('keeps percentage text instead of icon for plump theme', () => {
        const wrapper = mount(Progress, {
          props: { theme: 'plump', percentage: 50, status: 'success' },
        });
        expect(wrapper.find('.t-progress__icon').exists()).toBe(false);
        expect(wrapper.find('.t-progress__info').text()).toBe('50%');
      });

      it('keeps percentage text when status is active', () => {
        const wrapper = mount(Progress, {
          props: { percentage: 30, status: 'active' },
        });
        expect(wrapper.find('.t-progress__icon').exists()).toBe(false);
        expect(wrapper.find('.t-progress__info').text()).toBe('30%');
      });
    });

    describe('plump label placement', () => {
      it('renders label inside the inner bar when percentage is above 10', () => {
        const wrapper = mount(Progress, {
          props: { theme: 'plump', percentage: 50 },
        });
        const bar = wrapper.find('.t-progress__bar');
        expect(bar.classes()).toContain('t-progress--over-ten');
        expect(bar.find('.t-progress__inner .t-progress__info').exists()).toBe(true);
        expect(wrapper.find('.t-progress__info').text()).toBe('50%');
      });

      it('renders label outside the inner bar when percentage is 10 or below', () => {
        const wrapper = mount(Progress, {
          props: { theme: 'plump', percentage: 10 },
        });
        const bar = wrapper.find('.t-progress__bar');
        expect(bar.classes()).toContain('t-progress--under-ten');
        expect(bar.find('.t-progress__inner .t-progress__info').exists()).toBe(false);
        expect(bar.find('.t-progress__info').exists()).toBe(true);
        expect(wrapper.find('.t-progress__info').text()).toBe('10%');
      });
    });

    describe('circle progress boundaries', () => {
      it('hides the inner circle when percentage is 0', () => {
        const wrapper = mount(Progress, {
          props: { theme: 'circle', percentage: 0 },
        });
        expect(wrapper.find('.t-progress__circle-outer').exists()).toBe(true);
        expect(wrapper.find('.t-progress__circle-inner').exists()).toBe(false);
      });

      it('draws the inner circle stroke length according to percentage', () => {
        const wrapper = mount(Progress, {
          props: { theme: 'circle', percentage: 50 },
        });
        const innerCircle = wrapper.find('.t-progress__circle-inner');
        // 默认直径 112、环宽 6
        const diameter = 112;
        const strokeWidth = 6;
        const radius = diameter / 2 - strokeWidth / 2;
        const perimeter = Math.PI * 2 * ((diameter - strokeWidth) / 2);
        expect(innerCircle.attributes('r')).toBe(`${radius}`);
        expect(innerCircle.attributes('stroke-dasharray')).toBe(`${perimeter * 0.5}  ${perimeter * 0.5}`);
      });
    });

    describe('percentage completion status', () => {
      it('marks status as success once percentage reaches 100', () => {
        const wrapper = mount(Progress, {
          props: { percentage: 100 },
        });
        expect(wrapper.find('.t-progress--thin').classes()).toContain('t-progress--status-success');
        expect(wrapper.find('.t-progress__info').text()).toBe('100%');
      });
    });
  });
});
