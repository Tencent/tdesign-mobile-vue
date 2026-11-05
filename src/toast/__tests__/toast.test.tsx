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

  describe('scenarios', () => {
    it('updates the theme icon and loading class without retaining the previous icon', async () => {
      const wrapper = mount(Toast, { props: { theme: 'loading', message: '加载中' } });
      await wrapper.setProps({ theme: 'success', message: '完成' });
      expect(wrapper.findComponent(LoadingIcon).exists()).toBe(false);
      expect(wrapper.findComponent(CheckCircleIcon).exists()).toBe(true);
      expect(wrapper.get(`.${name}`).classes()).not.toContain(`${name}--loading`);
      expect(wrapper.text()).toBe('完成');
      await wrapper.setProps({ theme: undefined });
      expect(wrapper.findComponent(CheckCircleIcon).exists()).toBe(false);
      expect(wrapper.get(`.${name}__text`).text()).toBe('完成');
    });

    it('removes message nodes when the message becomes empty', async () => {
      const wrapper = mount(Toast, { props: { message: '提示内容' } });
      expect(wrapper.get(`.${name}__text`).text()).toBe('提示内容');
      await wrapper.setProps({ message: '' });
      expect(wrapper.find(`.${name}__text`).exists()).toBe(false);
      expect(wrapper.text()).toBe('');
    });

    it('unlocks toast scrolling on unmount and prevents scroll-through on the overlay', () => {
      document.body.classList.add('toast-test-page');
      const wrapper = mount(Toast, { props: { preventScrollThrough: true, showOverlay: true } });
      expect(document.body.classList.contains(bodyLockClass)).toBe(true);
      const event = new Event('touchmove', { bubbles: true, cancelable: true });
      wrapper.get(`.${prefix}-overlay`).element.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
      wrapper.unmount();
      expect(document.body.classList.contains(bodyLockClass)).toBe(false);
      expect(document.body.classList.contains('toast-test-page')).toBe(true);
    });

    it('keeps scrolling locked until the last locking toast is unmounted', () => {
      const first = mount(Toast, { props: { preventScrollThrough: true } });
      const second = mount(Toast, { props: { preventScrollThrough: true } });
      expect(document.body.classList.contains(bodyLockClass)).toBe(true);
      first.unmount();
      expect(document.body.classList.contains(bodyLockClass)).toBe(true);
      second.unmount();
      expect(document.body.classList.contains(bodyLockClass)).toBe(false);
    });

    it('updates direction and placement classes and styles when props change', async () => {
      const wrapper = mount(Toast, { props: { message: '动态布局', theme: 'success' } });
      await wrapper.setProps({ direction: 'column', placement: 'bottom' });
      const toast = wrapper.get(`.${name}`);
      expect(toast.classes()).toContain(`${name}--column`);
      expect(toast.classes()).not.toContain(`${name}--row`);
      expect((toast.element as HTMLElement).style.top).toBe('75%');
      expect(wrapper.find(`.${name}__icon--column`).exists()).toBe(true);
      expect(wrapper.find(`.${name}__icon--row`).exists()).toBe(false);
      expect(wrapper.get(`.${name}__text--column`).text()).toBe('动态布局');
      expect(wrapper.find(`.${name}__text--row`).exists()).toBe(false);
    });

    it('icon[function] & theme[loading]', () => {
      const wrapper = mount(Toast, {
        props: {
          icon: () => <ErrorCircleIcon />,
          theme: 'loading',
        },
      });
      // 自定义 icon 优先于 theme 内置图标
      expect(wrapper.findComponent(ErrorCircleIcon).exists()).toBe(true);
      expect(wrapper.findComponent(LoadingIcon).exists()).toBe(false);
    });

    it('overlayProps[object] & showOverlay[boolean]', () => {
      const wrapper = mount(Toast, {
        props: {
          showOverlay: true,
          overlayProps: {
            visible: false,
            preventScrollThrough: true,
          },
        },
      });
      // visible 与 preventScrollThrough 由 Toast 接管，覆盖 overlayProps 中的同名字段
      const overlay = wrapper.findComponent(Overlay);
      expect(overlay.vm.visible).toBe(true);
      expect(overlay.vm.preventScrollThrough).toBe(false);
    });
  });
});
