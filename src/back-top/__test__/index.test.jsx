import { describe, it, expect, vi } from 'vitest';
import BackTop from '../back-top.vue';
import { mount } from '@vue/test-utils';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';

describe('BackTop', () => {
  describe('props', () => {
    it(': fixed', async () => {
      const wrapper = mount(BackTop);
      expect(wrapper.find('.t-back-top--fixed').exists()).toEqual(true);
      await wrapper.setProps({
        fixed: false,
      });
      expect(wrapper.find('.t-back-top--fixed').exists()).toEqual(false);
    });

    it(': onToTop', () => {
      const onToTop = vi.fn();
      const wrapper = mount(BackTop, {
        props: { onToTop },
      });
      wrapper.find('.t-back-top').trigger('click');
      expect(onToTop).toHaveBeenCalledTimes(1);
    });

    it(': text', async () => {
      const wrapper = mount(BackTop);
      expect(wrapper.find('.t-back-top__text--round').exists()).toEqual(false);
      await wrapper.setProps({
        text: '返回',
      });
      expect(wrapper.find('.t-back-top__text--round').text()).toEqual('返回');
    });

    it(': theme', async () => {
      const wrapper = mount(BackTop);
      expect(wrapper.find('.t-back-top').classes()).toContain('t-back-top--round');
      await wrapper.setProps({
        theme: 'half-round',
      });
      expect(wrapper.find('.t-back-top').classes()).toContain('t-back-top--half-round');
    });

    it(': target', async () => {
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
  });

  describe('slots', () => {
    it(': icon', () => {
      const icon = () => <TIconApp />;

      const wrapper = mount(BackTop, {
        slots: {
          icon,
        },
      });
      expect(wrapper.find('.t-back-top > svg').classes()).toContain('t-icon');
    });
  });

  describe('events', () => {
    it(': to-top', async () => {
      const wrapper = mount(BackTop);
      wrapper.find('.t-back-top').trigger('click');
      expect(wrapper.emitted('to-top')).toHaveLength(1);
    });
  });
});
