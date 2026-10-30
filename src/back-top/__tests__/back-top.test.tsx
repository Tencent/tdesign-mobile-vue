import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { BacktopIcon as TIconBackTop, AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import BackTop from '../back-top';

describe('BackTop', () => {
  describe('props', () => {
    it('fixed[boolean]', async () => {
      const wrapper = mount(BackTop);
      expect(wrapper.find('.t-back-top--fixed').exists()).toEqual(true);
      await wrapper.setProps({
        fixed: false,
      });
      expect(wrapper.find('.t-back-top--fixed').exists()).toEqual(false);
    });

    it('text[string]', async () => {
      const wrapper = mount(BackTop);
      expect(wrapper.find('.t-back-top__text--round').exists()).toEqual(false);
      await wrapper.setProps({
        text: '返回',
      });
      expect(wrapper.find('.t-back-top__text--round').text()).toEqual('返回');
    });

    it('theme[round/half-round/round-dark/half-round-dark]', async () => {
      const wrapper = mount(BackTop);
      expect(wrapper.find('.t-back-top').classes()).toContain('t-back-top--round');
      await wrapper.setProps({
        theme: 'half-round',
      });
      expect(wrapper.find('.t-back-top').classes()).toContain('t-back-top--half-round');
    });

    it('target[function]', async () => {
      const wrapper = mount(BackTop, {
        props: {
          target: () => ({
            getBoundingClientRect: () => {
              return {
                top: 10,
              };
            },
          }),
        },
      });
      await wrapper.find('.t-back-top').trigger('click');
      expect(window.document.documentElement.scrollTop).toEqual(10);
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

    it('visibilityHeight[number]', async () => {
      const wrapper = mount(<BackTop visibilityHeight={0} />);
      // 初始不可见
      expect(wrapper.find('.t-back-top').attributes('style')).toContain('display: none');
      // 滚动距离达到 visibilityHeight 后可见
      document.documentElement.scrollTop = 10;
      document.documentElement.dispatchEvent(new Event('scroll'));
      await nextTick();
      expect(wrapper.find('.t-back-top').attributes('style')).not.toContain('display: none');
    });

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
    });
  });

  describe('events', () => {
    it('toTop', () => {
      const onToTop = vi.fn();
      const wrapper = mount(BackTop, {
        props: { onToTop },
      });
      wrapper.find('.t-back-top').trigger('click');
      expect(onToTop).toHaveBeenCalledTimes(1);
    });
  });

  describe('slots', () => {
    it('icon', () => {
      const icon = () => <TIconApp />;

      const wrapper = mount(BackTop, {
        slots: {
          icon,
        },
      });
      expect(wrapper.find('.t-back-top > svg').classes()).toContain('t-icon');
    });
  });
});
