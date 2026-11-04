import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { CheckCircleIcon, CloseCircleIcon, ErrorCircleIcon, LoadingIcon } from 'tdesign-icons-vue-next';
import Toast from '../toast';
import Overlay from '../../overlay';
import type { TdToastProps } from '../type';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-toast`;
const bodyLockClass = `${prefix}-toast--lock`;

describe('Toast', () => {
  // 滚动锁定会向 body 写入类名，用例结束后恢复
  afterEach(() => {
    document.body.innerHTML = '';
    document.body.className = '';
  });

  describe('props', () => {
    it('direction[row/column]', () => {
      (['row', 'column'] as TdToastProps['direction'][]).forEach((direction) => {
        const wrapper = mount(Toast, {
          props: {
            direction,
            icon: () => <LoadingIcon />,
            message: '排列方式',
          },
        });
        const $toast = wrapper.find(`.${name}`);
        expect($toast.classes()).toContain(`${name}--${direction}`);
        expect($toast.classes()).toContain(`${name}__content--${direction}`);
        expect(wrapper.find(`.${name}__icon--${direction}`).exists()).toBe(true);
        expect(wrapper.find(`.${name}__text--${direction}`).exists()).toBe(true);
      });
    });

    // duration 仅由插件 plugin.ts 消费（自动关闭定时器），组件源码未使用该属性，见 toast.plugin.test.tsx
    it.todo('duration[number]');

    it('icon[function]', () => {
      const wrapper = mount(Toast, {
        props: {
          icon: () => <LoadingIcon />,
        },
      });
      expect(wrapper.findComponent(LoadingIcon).exists()).toBe(true);
      // 存在图标时文字节点不再挂 __text 类名
      expect(wrapper.find(`.${name}__text`).exists()).toBe(false);
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
          message: () => '函数消息',
        },
      });
      expect(wrapper.find(`.${name}__text`).text()).toBe('函数消息');
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

    it('placement[top/middle/bottom]', () => {
      const topMap: Record<TdToastProps['placement'], string> = {
        top: '25%',
        middle: '50%',
        bottom: '75%',
      };
      (Object.keys(topMap) as TdToastProps['placement'][]).forEach((placement) => {
        const wrapper = mount(Toast, {
          props: {
            placement,
          },
        });
        // 展示位置映射为内容层 top 定位
        expect(wrapper.find(`.${name}__content`).attributes('style')).toContain(`top: ${topMap[placement]}`);
      });
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

    it('theme[loading/success/warning/error]', () => {
      const themeIconMap = {
        loading: LoadingIcon,
        success: CheckCircleIcon,
        warning: ErrorCircleIcon,
        error: CloseCircleIcon,
      } as const;

      (Object.keys(themeIconMap) as (keyof typeof themeIconMap)[]).forEach((theme) => {
        const wrapper = mount(Toast, {
          props: {
            theme,
          },
        });
        expect(wrapper.findComponent(themeIconMap[theme]).exists()).toBe(true);
      });

      const wrapper = mount(Toast, {
        props: {
          theme: 'loading',
        },
      });
      expect(wrapper.find(`.${name}`).classes()).toContain(`${name}--loading`);
    });

    it('default[slot]', () => {
      const wrapper = mount(Toast, {
        slots: {
          default: () => '插槽内容',
        },
      });
      expect(wrapper.find(`.${name}__text`).text()).toBe('插槽内容');
    });
  });

  // onClose/onDestroy 由插件 plugin.ts 在 clear 与定时器销毁时调用，组件源码不会触发，见 toast.plugin.test.tsx
  describe('events', () => {
    it.todo('close');

    it.todo('destroy');
  });

  describe('scenarios', () => {
    it('default & message[string]', () => {
      const wrapper = mount(Toast, {
        props: {
          message: '属性消息',
        },
        slots: {
          default: () => '插槽消息',
        },
      });
      // renderContent('default', 'message')，默认插槽优先于 message 属性
      expect(wrapper.find(`.${name}__text`).text()).toBe('插槽消息');
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
