import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Fab from '../fab.vue';
import { AppIcon as TIconApp, MoreIcon } from 'tdesign-icons-vue-next';

describe('fab', () => {
  describe('props', () => {
    it(': icon is a function', async () => {
      const icon = () => <TIconApp />;
      const wrapper = mount(Fab, {
        props: { icon },
      });
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it(': text', async () => {
      const text = 'fab';
      const wrapper = mount(Fab, {
        props: { text },
      });
      const textContainer = wrapper.find('.t-fab__text');
      expect(textContainer.text()).toBe(text);
    });

    it(': style', () => {
      const style = 'right: 32px; bottom: 48px;';
      const wrapper = mount(Fab, {
        props: { style },
      });
      const buttonContainer = wrapper.find('.t-button');
      expect(getComputedStyle(wrapper.element, null).right).toBe('32px');
      expect(getComputedStyle(wrapper.element, null).bottom).toBe('48px');
    });

    it(': buttonProps', () => {
      const icon = () => <TIconApp />;
      const buttonProps = {
        size: 'large',
        shape: 'circle',
        theme: 'danger',
      };
      const wrapper = mount(Fab, {
        props: { icon, buttonProps },
      });
      expect(wrapper.classes()).toContain(`t-button--danger`);
      expect(wrapper.classes()).toContain(`t-button--circle`);
      expect(wrapper.classes()).toContain(`t-button--size-large`);
    });
  });

  describe('slots', () => {
    it(': icon', () => {
      const icon = () => <TIconApp />;
      const wrapper = mount(Fab, {
        slots: {
          icon,
        },
      });
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('event', () => {
    it(': click', async () => {
      const onClick = vi.fn();
      const wrapper = mount({
        render() {
          return <Fab onClick={onClick} />;
        },
      });
      // 触发事件的节点
      await wrapper.trigger('click');
      // 判断事件是否被触发
      expect(onClick).toBeCalledTimes(1);
    });
  });
});
