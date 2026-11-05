import { describe, it, expect, afterEach } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { CheckCircleIcon, CloseCircleIcon, ErrorCircleIcon, LoadingIcon } from 'tdesign-icons-vue-next';
import Toast from '../toast';
import Overlay from '../../overlay';
import type { TdToastProps } from '../type';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-toast`;
const bodyLockClass = `${prefix}-toast--lock`;

enableAutoUnmount(afterEach);

// 先卸载组件以释放滚动锁及事件监听，再清理 DOM
afterEach(() => {
  document.body.innerHTML = '';
  document.body.className = '';
});

describe('Toast', () => {
  describe('props', () => {
    it.each(['row', 'column'] as TdToastProps['direction'][])('direction[%s]', (direction) => {
      const wrapper = mount(Toast, { props: { direction, icon: () => <LoadingIcon />, message: '排列方式' } });
      const toast = wrapper.find(`.${name}`);
      expect(toast.classes()).toContain(`${name}--${direction}`);
      expect(toast.classes()).toContain(`${name}__content--${direction}`);
      expect(wrapper.find(`.${name}__icon--${direction}`).exists()).toBe(true);
      expect(wrapper.find(`.${name}__text--${direction}`).exists()).toBe(true);
    });

    // duration 仅由插件 plugin.ts 消费（自动关闭定时器），组件源码未使用该属性，见 toast.plugin.test.tsx
    it.todo('duration[number]');

    it('icon[function]', () => {
      const wrapper = mount(Toast, {
        props: {
          icon: () => <LoadingIcon />,
          message: '带图标的消息',
        },
      });
      expect(wrapper.findComponent(LoadingIcon).exists()).toBe(true);
      // 存在图标时文字节点不再挂 __text 类名
      expect(wrapper.find(`.${name}__text`).exists()).toBe(false);
      expect(wrapper.get(`.${name}__text--row`).text()).toBe('带图标的消息');
    });

    it('icon[slot]', () => {
      const wrapper = mount(Toast, {
        props: { message: '插槽图标' },
        slots: { icon: () => <CheckCircleIcon /> },
      });
      expect(wrapper.findComponent(CheckCircleIcon).exists()).toBe(true);
      expect(wrapper.get(`.${name}__text--row`).text()).toBe('插槽图标');
    });

    it('message[string]', () => {
      const wrapper = mount(Toast, {
        props: {
          message: '文字提示',
        },
      });
      expect(wrapper.find(`.${name}__text`).text()).toBe('文字提示');
    });

    it('message[function]', () => {
      const wrapper = mount(Toast, {
        props: {
          message: () => <strong class="function-message">函数消息</strong>,
        },
      });
      expect(wrapper.get(`.${name}__text .function-message`).text()).toBe('函数消息');
    });

    it('message[slot]', () => {
      const wrapper = mount(Toast, {
        slots: { message: () => <strong class="slot-message">具名插槽消息</strong> },
      });
      expect(wrapper.get(`.${name}__text .slot-message`).text()).toBe('具名插槽消息');
    });

    it('overlayProps[object]', () => {
      const wrapper = mount(Toast, {
        props: {
          overlayProps: {
            duration: 1000,
            zIndex: 2000,
          },
        },
      });
      const style = wrapper.find(`.${prefix}-overlay`).attributes('style');
      expect(style).toContain('transition-duration: 1000ms');
      expect(style).toContain('z-index: 2000');
    });

    it.each([
      ['top', '25%'],
      ['middle', '50%'],
      ['bottom', '75%'],
    ] as const)('placement[%s]', (placement, top) => {
      const wrapper = mount(Toast, { props: { placement } });
      // 展示位置映射为内容层 top 定位
      expect(wrapper.find(`.${name}__content`).attributes('style')).toContain(`top: ${top}`);
    });

    it('preventScrollThrough[boolean]', async () => {
      const wrapper = mount(Toast);
      expect(document.body.classList.contains(bodyLockClass)).toBe(false);

      await wrapper.setProps({ preventScrollThrough: true });
      expect(document.body.classList.contains(bodyLockClass)).toBe(true);

      await wrapper.setProps({ preventScrollThrough: false });
      expect(document.body.classList.contains(bodyLockClass)).toBe(false);

      wrapper.unmount();
    });

    it('showOverlay[boolean]', async () => {
      const wrapper = mount(Toast, {
        props: {
          showOverlay: true,
        },
      });
      const $overlay = wrapper.find(`.${prefix}-overlay`);
      expect($overlay.classes()).toContain(`${prefix}-overlay--active`);
      expect(wrapper.findComponent(Overlay).vm.visible).toBe(true);

      await wrapper.setProps({ showOverlay: false });
      expect($overlay.classes()).not.toContain(`${prefix}-overlay--active`);
      expect(wrapper.findComponent(Overlay).vm.visible).toBe(false);
    });

    it.each([
      ['loading', LoadingIcon],
      ['success', CheckCircleIcon],
      ['warning', ErrorCircleIcon],
      ['error', CloseCircleIcon],
    ] as const)('theme[%s]', (theme, icon) => {
      const wrapper = mount(Toast, { props: { theme } });
      expect(wrapper.findComponent(icon).exists()).toBe(true);
      if (theme === 'loading') {
        expect(wrapper.find(`.${name}`).classes()).toContain(`${name}--loading`);
      }
    });

    it('default[slot]', () => {
      const wrapper = mount(Toast, {
        slots: {
          default: () => <span class="default-message">插槽内容</span>,
        },
      });
      expect(wrapper.get(`.${name}__text .default-message`).text()).toBe('插槽内容');
    });
  });

  // onClose/onDestroy 由插件 plugin.ts 在 clear 与定时器销毁时调用，组件源码不会触发，见 toast.plugin.test.tsx
  describe('events', () => {
    it.todo('close');

    it.todo('destroy');
  });
});
