import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Fab from '../fab';

// 模拟一次悬浮球拖拽手势（起点 -> 终点）
const dragTo = async (wrapper, startX, startY, endX, endY) => {
  await wrapper.trigger('touchstart', { touches: [{ pageX: startX, pageY: startY }] });
  await wrapper.trigger('touchmove', { touches: [{ pageX: endX, pageY: endY }] });
  await wrapper.trigger('touchend', { touches: [{ pageX: endX, pageY: endY }] });
};

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

    it('draggable[boolean]', async () => {
      // 可拖拽：拖拽后位置随手势更新（默认 right:16px / bottom:32px 被拖离原位）
      const wrapper = mount(Fab, {
        props: { draggable: true },
      });
      await nextTick();
      await dragTo(wrapper, 200, 200, 600, 600);
      expect(wrapper.attributes('style')).toContain('right: 0px');
      expect(wrapper.attributes('style')).toContain('bottom: 0px');

      // 不可拖拽（默认）：相同手势后位置保持初始样式
      const staticWrapper = mount(Fab);
      await nextTick();
      await dragTo(staticWrapper, 200, 200, 600, 600);
      expect(staticWrapper.attributes('style')).toContain('right: 16px');
      expect(staticWrapper.attributes('style')).toContain('bottom: 32px');
    });

    it('magnet[string]', () => {
      // jsdom 无真实视口宽度，吸附落点恒等于边界值无法与 clamp 区分，
      // 此处验证 magnet 专属通道：设置吸附时渲染吸附动画类
      const rightWrapper = mount(Fab, {
        props: { magnet: 'right' },
      });
      expect(rightWrapper.classes()).toContain('t-fab--animation');

      const leftWrapper = mount(Fab, {
        props: { magnet: 'left' },
      });
      expect(leftWrapper.classes()).toContain('t-fab--animation');

      const noMagnetWrapper = mount(Fab);
      expect(noMagnetWrapper.classes()).not.toContain('t-fab--animation');
    });

    it('xBounds[array]', async () => {
      const wrapper = mount(Fab, {
        props: { draggable: true, xBounds: [16, 100] },
      });
      await nextTick();
      // 向右下拖拽出界，right 被限制在右边界 100（未设置时为 0）
      await dragTo(wrapper, 200, 200, 900, 900);
      expect(wrapper.attributes('style')).toContain('right: 100px');
      expect(wrapper.attributes('style')).toContain('bottom: 0px');
    });

    it('yBounds[array]', async () => {
      const wrapper = mount(Fab, {
        props: { draggable: true, yBounds: [48, 48] },
      });
      await nextTick();
      // 向右下拖拽出界，bottom 被限制在边界 48（未设置时为 0）
      await dragTo(wrapper, 200, 200, 900, 900);
      expect(wrapper.attributes('style')).toContain('right: 0px');
      expect(wrapper.attributes('style')).toContain('bottom: 48px');
    });
  });
});
