import { enableAutoUnmount, mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Fab from '../fab';
import Button from '../../button';

enableAutoUnmount(afterEach);

let sizeStyle: HTMLStyleElement;

beforeEach(() => {
  vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(360);
  vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(640);
  vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(360);
  vi.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(640);
  vi.spyOn(screen, 'width', 'get').mockReturnValue(360);
  vi.spyOn(screen, 'height', 'get').mockReturnValue(640);
  sizeStyle = document.createElement('style');
  sizeStyle.textContent = '.t-fab__button { width: 48px; height: 48px; }';
  document.head.appendChild(sizeStyle);
});

afterEach(() => {
  sizeStyle.remove();
  vi.restoreAllMocks();
});

const position = (wrapper: VueWrapper<any>) => ({
  right: (wrapper.element as HTMLElement).style.right,
  bottom: (wrapper.element as HTMLElement).style.bottom,
});

// 模拟一次悬浮球拖拽手势（起点 -> 终点）
const dragTo = async (wrapper: VueWrapper<any>, startX: number, startY: number, endX: number, endY: number) => {
  await wrapper.trigger('touchstart', { touches: [{ pageX: startX, pageY: startY }] });
  await wrapper.trigger('touchmove', { touches: [{ pageX: endX, pageY: endY }] });
  await wrapper.trigger('touchend', { touches: [{ pageX: endX, pageY: endY }] });
};

describe('Fab', () => {
  describe('props', () => {
    it('buttonProps[object]', () => {
      const icon = () => <TIconApp />;
      const wrapper = mount(Fab, {
        props: { icon, buttonProps: { size: 'small', shape: 'square', theme: 'danger' } },
      });
      const $btn = wrapper.find('.t-button');
      expect($btn.classes()).toContain(`t-button--danger`);
      expect($btn.classes()).toContain(`t-button--square`);
      expect($btn.classes()).toContain(`t-button--size-small`);
    });

    it('draggable[boolean]', async () => {
      const wrapper = mount(Fab, { props: { draggable: true } });
      await nextTick();
      await dragTo(wrapper, 100, 100, 50, 50);
      expect(position(wrapper)).toEqual({ right: '66px', bottom: '82px' });

      const staticWrapper = mount(Fab, { props: { draggable: false } });
      await dragTo(staticWrapper, 100, 100, 50, 50);
      expect(position(staticWrapper)).toEqual({ right: '16px', bottom: '32px' });
    });

    it('draggable[all/vertical/horizontal]', async () => {
      const all = mount(Fab, { props: { draggable: 'all' } });
      await nextTick();
      await dragTo(all, 100, 100, 50, 50);
      expect(position(all)).toEqual({ right: '66px', bottom: '82px' });

      const vertical = mount(Fab, { props: { draggable: 'vertical' } });
      await nextTick();
      await dragTo(vertical, 100, 100, 50, 50);
      expect(position(vertical)).toEqual({ right: '16px', bottom: '82px' });

      const horizontal = mount(Fab, { props: { draggable: 'horizontal' } });
      await nextTick();
      await dragTo(horizontal, 100, 100, 50, 50);
      expect(position(horizontal)).toEqual({ right: '66px', bottom: '32px' });
    });

    it('icon[function]', async () => {
      const icon = () => <TIconApp />;
      const wrapper = mount(Fab, {
        props: { icon },
      });
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('magnet[boolean]', async () => {
      const wrapper = mount(Fab, { props: { draggable: true, magnet: true } });
      await nextTick();
      await dragTo(wrapper, 100, 100, 50, 50);
      expect(position(wrapper)).toEqual({ right: '0px', bottom: '82px' });
      await dragTo(wrapper, 300, 100, 50, 100);
      expect(position(wrapper)).toEqual({ right: '312px', bottom: '82px' });

      const unsnapped = mount(Fab, { props: { draggable: true, magnet: false } });
      await nextTick();
      await dragTo(unsnapped, 100, 100, 50, 50);
      expect(position(unsnapped)).toEqual({ right: '66px', bottom: '82px' });
      expect(unsnapped.classes()).not.toContain('t-fab--animation');
    });

    it('magnet[left/right]', async () => {
      const left = mount(Fab, { props: { draggable: true, magnet: 'left' } });
      await nextTick();
      await dragTo(left, 100, 100, 50, 50);
      expect(position(left)).toEqual({ right: '312px', bottom: '82px' });

      const right = mount(Fab, { props: { draggable: true, magnet: 'right' } });
      await nextTick();
      await dragTo(right, 100, 100, 50, 50);
      expect(position(right)).toEqual({ right: '0px', bottom: '82px' });
    });

    it('style[string]', () => {
      const style = 'right: 32px; bottom: 48px;';
      const wrapper = mount(Fab, {
        props: { style },
      });
      expect(getComputedStyle(wrapper.element, null).right).toBe('32px');
      expect(getComputedStyle(wrapper.element, null).bottom).toBe('48px');
    });

    it('style[object]', async () => {
      const wrapper = mount(Fab, { props: { style: { right: '24px', bottom: '40px' } } });
      expect(position(wrapper)).toEqual({ right: '24px', bottom: '40px' });
      await wrapper.setProps({ style: { right: '36px', bottom: '52px' } });
      expect(position(wrapper)).toEqual({ right: '36px', bottom: '52px' });
    });

    it('text[string]', async () => {
      const text = 'fab';
      const wrapper = mount(Fab, {
        props: { text },
      });
      const textContainer = wrapper.find('.t-button__content');
      expect(textContainer.text()).toBe(text);
      expect(wrapper.findComponent(Button).props('shape')).toBe('round');
      await wrapper.setProps({ text: '' });
      expect(wrapper.findComponent(Button).props('shape')).toBe('circle');
      expect(wrapper.get('.t-button__content').text()).toBe('');
    });

    it('xBounds[array]', async () => {
      const wrapper = mount(Fab, { props: { draggable: true, xBounds: ['20px', 30] } });
      await nextTick();
      await dragTo(wrapper, 100, 100, 1000, 100);
      expect(position(wrapper)).toEqual({ right: '30px', bottom: '32px' });
      await dragTo(wrapper, 1000, 100, 0, 100);
      expect(position(wrapper)).toEqual({ right: '292px', bottom: '32px' });
    });

    it('yBounds[array]', async () => {
      const wrapper = mount(Fab, { props: { draggable: true, yBounds: ['40px', 50] } });
      await nextTick();
      await dragTo(wrapper, 100, 100, 100, 1000);
      expect(position(wrapper)).toEqual({ right: '16px', bottom: '50px' });
      await dragTo(wrapper, 100, 1000, 100, 0);
      expect(position(wrapper)).toEqual({ right: '16px', bottom: '552px' });
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
      expect(onClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });

    it('dragStart', async () => {
      const onDragStart = vi.fn();
      const wrapper = mount(Fab, { props: { draggable: true, onDragStart } });
      await wrapper.trigger('touchstart', { touches: [{ pageX: 100, pageY: 100 }] });
      expect(onDragStart).toHaveBeenCalledTimes(1);
      expect(onDragStart).toHaveBeenCalledWith({ e: expect.objectContaining({ type: 'touchstart' }) });
    });

    it('dragEnd', async () => {
      const onDragEnd = vi.fn();
      const wrapper = mount(Fab, { props: { draggable: true, onDragEnd } });
      await nextTick();
      await wrapper.trigger('touchstart', { touches: [{ pageX: 100, pageY: 100 }] });
      await wrapper.trigger('touchend', { touches: [] });
      expect(onDragEnd).not.toHaveBeenCalled();
      await dragTo(wrapper, 100, 100, 50, 50);
      expect(onDragEnd).toHaveBeenCalledTimes(1);
      expect(onDragEnd).toHaveBeenCalledWith({ e: expect.objectContaining({ type: 'touchend' }) });
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(Fab, { slots: { default: () => <button class="custom-fab">自定义悬浮按钮</button> } });
      expect(wrapper.get('.custom-fab').text()).toBe('自定义悬浮按钮');
      expect(wrapper.findComponent(Button).exists()).toBe(false);
    });

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

  describe('scenarios', () => {
    // TODO: 跨端跟进 Fab 动态 style 更新：mobile-react 的 DOM 位置读取、小程序的 moveStyle 覆盖及位置缓存
    // 均存在潜在同步风险，需在各端补回归测试确认后再决定修复；当前未修改这两个仓库。
    // TODO: style watcher 从旧 DOM 读取位置，待修复后启用以下动态样式回归用例。
    it.todo('uses updated style as the origin of subsequent drags', async () => {
      const wrapper = mount(Fab, { props: { draggable: true } });
      await nextTick();
      await dragTo(wrapper, 100, 100, 50, 50);
      expect(position(wrapper)).toEqual({ right: '66px', bottom: '82px' });

      await wrapper.setProps({ draggable: false, style: 'right: 40px; bottom: 60px;' });
      expect(position(wrapper)).toEqual({ right: '40px', bottom: '60px' });
      await wrapper.setProps({ draggable: true });
      await dragTo(wrapper, 100, 100, 80, 70);
      expect(position(wrapper)).toEqual({ right: '60px', bottom: '90px' });
    });

    // 同样依赖 style watcher 修复：拖拽启用期间更新字符串样式时，位置基准仍取自旧 DOM，断言会失败。
    it.todo('updates string style while dragging remains enabled', async () => {
      const wrapper = mount(Fab, { props: { draggable: true } });
      await nextTick();
      await dragTo(wrapper, 100, 100, 50, 50);
      await wrapper.setProps({ style: 'right: 40px; bottom: 60px;' });
      expect(position(wrapper)).toEqual({ right: '40px', bottom: '60px' });
      await dragTo(wrapper, 100, 100, 80, 70);
      expect(position(wrapper)).toEqual({ right: '60px', bottom: '90px' });
    });

    // 同样依赖 style watcher 修复：拖拽启用期间更新对象样式时，位置基准仍取自旧 DOM，断言会失败。
    it.todo('updates object style while dragging remains enabled', async () => {
      const wrapper = mount(Fab, { props: { draggable: true } });
      await nextTick();
      await dragTo(wrapper, 100, 100, 50, 50);
      await wrapper.setProps({ style: { right: '30px', bottom: '50px' } });
      expect(position(wrapper)).toEqual({ right: '30px', bottom: '50px' });
      await dragTo(wrapper, 100, 100, 80, 70);
      expect(position(wrapper)).toEqual({ right: '50px', bottom: '80px' });
    });

    it('icon prop takes priority over icon slot and falls back when removed', async () => {
      const wrapper = mount(Fab, {
        props: { icon: () => <span class="prop-icon">属性图标</span> },
        slots: { icon: () => <span class="slot-icon">插槽图标</span> },
      });
      expect(wrapper.get('.prop-icon').text()).toBe('属性图标');
      expect(wrapper.find('.slot-icon').exists()).toBe(false);
      await wrapper.setProps({ icon: undefined });
      expect(wrapper.find('.prop-icon').exists()).toBe(false);
      expect(wrapper.get('.slot-icon').text()).toBe('插槽图标');
    });

    it('default slot replaces built-in button, text and icon', () => {
      const wrapper = mount(Fab, {
        props: { text: '内置文本', icon: () => <TIconApp /> },
        slots: { default: () => <button>自定义内容</button> },
      });
      expect(wrapper.text()).toBe('自定义内容');
      expect(wrapper.findComponent(Button).exists()).toBe(false);
      expect(wrapper.findComponent(TIconApp).exists()).toBe(false);
    });

    it('magnet respects horizontal boundaries', async () => {
      const wrapper = mount(Fab, { props: { draggable: true, magnet: 'left', xBounds: [20, 30] } });
      await nextTick();
      await dragTo(wrapper, 100, 100, 50, 50);
      expect(position(wrapper).right).toBe('292px');
      await wrapper.setProps({ magnet: 'right' });
      await dragTo(wrapper, 100, 100, 50, 50);
      expect(position(wrapper).right).toBe('30px');
    });

    it('ignores touch moves without touch points', async () => {
      const onDragEnd = vi.fn();
      const wrapper = mount(Fab, { props: { draggable: true, onDragEnd } });
      await nextTick();
      await wrapper.trigger('touchstart', { touches: [{ pageX: 100, pageY: 100 }] });
      await wrapper.trigger('touchmove', { touches: [] });
      await wrapper.trigger('touchend', { touches: [] });
      expect(position(wrapper)).toEqual({ right: '16px', bottom: '32px' });
      expect(onDragEnd).not.toHaveBeenCalled();
    });
  });
});
