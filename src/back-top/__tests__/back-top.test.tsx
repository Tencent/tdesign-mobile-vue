import { ref } from 'vue';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
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

    it('theme[string]', async () => {
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

    it('icon[boolean]', () => {
      const icon = ref(false);
      const wrapper = mount(<BackTop icon={icon.value} />);
      icon.value = true;
      expect(wrapper.findComponent(TIconBackTop)).toBeTruthy();
    });

    it('icon[function]', () => {
      const wrapper = mount(<BackTop icon={() => <TIconApp />} />);
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
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

    it('toTop', async () => {
      const onToTop = vi.fn();
      const wrapper = mount(<BackTop onToTop={onToTop} />);
      wrapper.find('.t-back-top').trigger('click');
      expect(onToTop).toBeCalledTimes(1);
    });
  });

  describe('slots', () => {
    it('icon[slot]', () => {
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
