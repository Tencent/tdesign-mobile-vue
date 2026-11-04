import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastPlugin } from '../index';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-toast`;

const getToast = () => document.querySelector(`.${name}`);

describe('ToastPlugin', () => {
  afterEach(() => {
    // 恢复计时器，并清理可能残留的实例与挂载节点，避免泄漏到后续用例
    vi.useRealTimers();
    ToastPlugin.clear();
    document.body.innerHTML = '';
    document.body.className = '';
  });

  describe('scenarios', () => {
    it('show[string]', () => {
      const handler = ToastPlugin('Hello Toast') as unknown as { clear: () => void };

      // 默认挂载到 body
      expect(getToast()).toBeTruthy();
      expect(document.body.textContent).toContain('Hello Toast');
      // 返回实例并暴露 clear 方法
      expect(handler.clear).toBeInstanceOf(Function);

      handler.clear();
      expect(getToast()).toBeNull();
    });

    it('show[object]', () => {
      ToastPlugin({
        message: '对象配置',
        direction: 'column',
        placement: 'top',
      });

      const toast = getToast();
      expect(document.body.textContent).toContain('对象配置');
      expect(toast.classList.contains(`${name}--column`)).toBe(true);
      expect(toast.getAttribute('style')).toContain('top: 25%');

      ToastPlugin.clear();
    });

    it.each(['loading', 'success', 'warning', 'error'] as const)('%s[string]', (theme) => {
      ToastPlugin[theme](`主题提示`);

      expect(document.body.textContent).toContain('主题提示');
      // theme 快捷方法会渲染对应图标
      expect(getToast().querySelector('svg')).toBeTruthy();
      if (theme === 'loading') {
        expect(getToast().classList.contains(`${name}--loading`)).toBe(true);
      }

      ToastPlugin.clear();
    });

    it.each(['loading', 'success', 'warning', 'error'] as const)('%s[object]', (theme) => {
      ToastPlugin[theme]({ message: '快捷方法' });

      expect(document.body.textContent).toContain('快捷方法');
      expect(getToast().querySelector('svg')).toBeTruthy();

      ToastPlugin.clear();
    });

    it('clear', () => {
      vi.useFakeTimers();
      const onClose = vi.fn();
      const onDestroy = vi.fn();

      ToastPlugin({ message: '手动关闭', duration: 2000, onClose, onDestroy });
      expect(getToast()).toBeTruthy();

      ToastPlugin.clear();
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(getToast()).toBeNull();

      // 手动 clear 会取消自动关闭定时器，onDestroy 不再触发
      vi.advanceTimersByTime(3000);
      expect(onDestroy).not.toHaveBeenCalled();

      // 无实例时 clear 为空操作
      expect(() => ToastPlugin.clear()).not.toThrow();
    });

    it('duration', () => {
      vi.useFakeTimers();
      const onClose = vi.fn();
      const onDestroy = vi.fn();

      // 默认 2000ms 后自动关闭
      ToastPlugin({ message: '默认时长', onClose, onDestroy });
      vi.advanceTimersByTime(1999);
      expect(getToast()).toBeTruthy();
      expect(onClose).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onDestroy).toHaveBeenCalledTimes(1);
      expect(getToast()).toBeNull();

      // 自定义时长生效
      ToastPlugin({ message: '自定义时长', duration: 1000 });
      vi.advanceTimersByTime(999);
      expect(getToast()).toBeTruthy();
      vi.advanceTimersByTime(1);
      expect(getToast()).toBeNull();
    });

    it('duration[0]', () => {
      vi.useFakeTimers();

      // duration 为 0 时常驻展示，不会自动关闭
      ToastPlugin({ message: '常驻提示', duration: 0 });
      vi.advanceTimersByTime(60 * 1000);
      expect(getToast()).toBeTruthy();

      ToastPlugin.clear();
      expect(getToast()).toBeNull();
    });

    it('replaces the previous toast', () => {
      const previousOnClose = vi.fn();

      ToastPlugin({ message: '第一条', onClose: previousOnClose });
      ToastPlugin({ message: '第二条' });

      // 展示新提示前会先关闭上一条，全局仅保留一个实例
      expect(previousOnClose).toHaveBeenCalledTimes(1);
      expect(document.querySelectorAll(`.${name}`)).toHaveLength(1);
      expect(document.body.textContent).toContain('第二条');
      expect(document.body.textContent).not.toContain('第一条');

      ToastPlugin.clear();
    });

    it('attach', () => {
      const container = document.createElement('div');
      container.id = 'toast-attach';
      document.body.appendChild(container);

      // attach 支持选择器
      ToastPlugin({ message: '选择器挂载', attach: '#toast-attach' });
      expect(container.querySelector(`.${name}`)).toBeTruthy();

      ToastPlugin.clear();
      expect(container.querySelector(`.${name}`)).toBeNull();

      // attach 支持函数
      ToastPlugin({ message: '函数挂载', attach: () => container });
      expect(container.querySelector(`.${name}`)).toBeTruthy();

      ToastPlugin.clear();
      container.remove();
    });

    it('logs an error when the attach target is missing', () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});

      try {
        ToastPlugin({ attach: 'not-exist-selector', message: '挂载失败' });
        expect(error).toHaveBeenCalledWith('attach is not exist');
      } finally {
        error.mockRestore();
      }
    });

    it('installs as a global plugin exposing $toast', () => {
      const wrapper = mount(() => <div></div>, { global: { plugins: [ToastPlugin] } });
      const { $toast } = wrapper.vm as unknown as { $toast: typeof ToastPlugin };

      expect($toast).toBe(ToastPlugin);

      $toast('全局安装');
      expect(document.body.textContent).toContain('全局安装');

      wrapper.unmount();
      ToastPlugin.clear();
    });
  });
});
