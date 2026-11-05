import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { BacktopIcon as TIconBackTop, AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import BackTop from '../back-top';

describe('BackTop', () => {
  describe('props', () => {
    it('container[function]', async () => {
      const div = document.createElement('div');
      div.id = 'back-top-container';
      document.body.appendChild(div);

      const wrapper = mount(<BackTop container={() => document.querySelector('#back-top-container')} />);
      expect(wrapper.find('.t-back-top').attributes('style')).toContain('display: none');
      // 自定义容器内滚动达到阈值后可见
      div.scrollTop = 300;
      div.dispatchEvent(new Event('scroll'));
      await nextTick();
      expect(wrapper.find('.t-back-top').attributes('style')).not.toContain('display: none');

      wrapper.unmount();
      expect(div.onscroll).toBeNull();
      div.remove();
    });

    it('fixed[boolean]', async () => {
      const wrapper = mount(BackTop);
      expect(wrapper.find('.t-back-top--fixed').exists()).toEqual(true);
      await wrapper.setProps({
        fixed: false,
      });
      expect(wrapper.find('.t-back-top--fixed').exists()).toEqual(false);
    });

    it('icon[boolean]', async () => {
      const wrapper = mount(<BackTop icon={false} />);
      expect(wrapper.find('.t-back-top svg').exists()).toBe(false);
      await wrapper.setProps({ icon: true });
      expect(wrapper.findComponent(TIconBackTop).exists()).toBe(true);
    });

    it('icon[function]', () => {
      const wrapper = mount(<BackTop icon={() => <TIconApp />} />);
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('icon[slot]', () => {
      const icon = () => <TIconApp />;

      const wrapper = mount(BackTop, {
        slots: {
          icon,
        },
      });
      expect(wrapper.find('.t-back-top > svg').classes()).toContain('t-icon');
    });

    it('target[function]', async () => {
      const container = document.createElement('div');
      const target = document.createElement('div');
      document.body.append(container, target);
      const targetRect = vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
        x: 0,
        y: 10,
        top: 10,
        right: 0,
        bottom: 10,
        left: 0,
        width: 0,
        height: 0,
        toJSON: () => ({}),
      });
      const wrapper = mount(BackTop, {
        props: {
          target: () => target,
          container: () => container,
        },
      });
      await nextTick();

      container.scrollTop = 100;
      await wrapper.find('.t-back-top').trigger('click');

      expect(container.scrollTop).toEqual(10);
      targetRect.mockRestore();
      wrapper.unmount();
    });

    it('text[string]', async () => {
      const wrapper = mount(BackTop);
      expect(wrapper.find('.t-back-top__text--round').exists()).toEqual(false);
      await wrapper.setProps({
        text: '返回',
      });
      expect(wrapper.find('.t-back-top__text--round').text()).toEqual('返回');
    });

    it.each(['round', 'half-round', 'round-dark', 'half-round-dark'] as const)('theme[%s]', (theme) => {
      const wrapper = mount(BackTop, { props: { theme } });
      expect(wrapper.find('.t-back-top').classes()).toContain(`t-back-top--${theme}`);
    });

    it('visibilityHeight[number]', async () => {
      const container = document.documentElement;
      const originalScrollTop = container.scrollTop;
      const originalOnScroll = container.onscroll;
      const wrapper = mount(<BackTop visibilityHeight={100} />);

      expect(wrapper.find('.t-back-top').attributes('style')).toContain('display: none');
      container.scrollTop = 99;
      container.dispatchEvent(new Event('scroll'));
      await nextTick();
      expect(wrapper.find('.t-back-top').attributes('style')).toContain('display: none');

      container.scrollTop = 100;
      container.dispatchEvent(new Event('scroll'));
      await nextTick();
      expect(wrapper.find('.t-back-top').attributes('style')).not.toContain('display: none');
      wrapper.unmount();
      container.scrollTop = originalScrollTop;
      container.onscroll = originalOnScroll;
    });
  });

  describe('events', () => {
    it('toTop', async () => {
      const container = document.createElement('div');
      container.scrollTop = 120;
      const onToTop = vi.fn();
      const wrapper = mount(BackTop, {
        props: {
          container: () => container,
          onToTop,
        },
      });
      await wrapper.find('.t-back-top').trigger('click');

      expect(container.scrollTop).toBe(0);
      expect(onToTop).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });
  });
});
