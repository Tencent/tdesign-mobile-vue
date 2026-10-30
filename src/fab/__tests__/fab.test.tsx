import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Fab from '../fab';

describe('Fab', () => {
  describe('props', () => {
    it('buttonProps[object]', () => {
      const icon = () => <TIconApp />;
      const buttonProps = {
        size: 'large',
        shape: 'circle',
        theme: 'danger',
      };
      const wrapper = mount(Fab, {
        props: { icon, buttonProps },
      });
      const $btn = wrapper.find('.t-button');
      expect($btn.classes()).toContain(`t-button--danger`);
      expect($btn.classes()).toContain(`t-button--circle`);
      expect($btn.classes()).toContain(`t-button--size-large`);
    });

    it('icon[function]', async () => {
      const icon = () => <TIconApp />;
      const wrapper = mount(Fab, {
        props: { icon },
      });
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('style[string]', () => {
      const style = 'right: 32px; bottom: 48px;';
      const wrapper = mount(Fab, {
        props: { style },
      });
      expect(getComputedStyle(wrapper.element, null).right).toBe('32px');
      expect(getComputedStyle(wrapper.element, null).bottom).toBe('48px');
    });

    it('text[string]', async () => {
      const text = 'fab';
      const wrapper = mount(Fab, {
        props: { text },
      });
      const textContainer = wrapper.find('.t-button__content');
      expect(textContainer.text()).toBe(text);
    });
  });

  describe('slots', () => {
    it('icon', () => {
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

  describe('events', () => {
    it('click', async () => {
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

    // draggable/magnet/xBounds/yBounds 悬浮球拖拽磁吸行为，依赖真实交互
    it.todo('draggable[boolean]');
    it.todo('magnet[string]');
    it.todo('xBounds[object]');
    it.todo('yBounds[object]');
  });
});
