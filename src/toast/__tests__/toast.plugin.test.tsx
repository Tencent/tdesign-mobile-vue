import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastPlugin } from '../index';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-toast`;

const getToast = () => document.querySelector(`.${name}`);
const themeIconSelectors = {
  loading: '.t-icon-loading',
  success: '.t-icon-check-circle',
  warning: '.t-icon-error-circle',
  error: '.t-icon-close-circle',
} as const;

enableAutoUnmount(afterEach);

describe('ToastPlugin', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 恢复计时器，并清理可能残留的实例与挂载节点，避免泄漏到后续用例
    ToastPlugin.clear();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
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
      // 不只检查存在 SVG，还需确认快捷方法映射到正确的主题图标
      expect(getToast().querySelector(themeIconSelectors[theme])).not.toBeNull();
      if (theme === 'loading') {
        expect(getToast().classList.contains(`${name}--loading`)).toBe(true);
      }

      ToastPlugin.clear();
    });

    it.each(['loading', 'success', 'warning', 'error'] as const)('%s[object]', (theme) => {
      // 快捷方法覆盖传入 theme，同时保留其他配置
      ToastPlugin[theme]({
        message: '快捷方法',
        theme: theme === 'success' ? 'error' : 'success',
        placement: 'bottom',
      });

      expect(document.body.textContent).toContain('快捷方法');
      expect(getToast().querySelector(themeIconSelectors[theme])).not.toBeNull();
      expect((getToast() as HTMLElement).style.top).toBe('75%');

      ToastPlugin.clear();
    });

    it('clear', () => {
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

    it.each([0, -1])('duration[%s]', (duration) => {
      // 非正数时常驻展示，不会自动关闭
      ToastPlugin({ message: '常驻提示', duration });
      vi.advanceTimersByTime(60 * 1000);
      expect(getToast()).toBeTruthy();

      ToastPlugin.clear();
      expect(getToast()).toBeNull();
    });

    it('replaces the previous toast', () => {
      const previousOnClose = vi.fn();
      const previousOnDestroy = vi.fn();
      const onClose = vi.fn();
      const onDestroy = vi.fn();

      ToastPlugin({ message: '第一条', duration: 1000, onClose: previousOnClose, onDestroy: previousOnDestroy });
      vi.advanceTimersByTime(500);
      ToastPlugin({ message: '第二条', duration: 2000, onClose, onDestroy });

      // 展示新提示前会先关闭上一条，全局仅保留一个实例
      expect(previousOnClose).toHaveBeenCalledTimes(1);
      expect(document.querySelectorAll(`.${name}`)).toHaveLength(1);
      expect(document.body.textContent).toContain('第二条');
      expect(document.body.textContent).not.toContain('第一条');

      // 第一条的截止时间不能提前关闭第二条，第二条从创建时重新计时
      vi.advanceTimersByTime(500);
      expect(document.body.textContent).toContain('第二条');
      expect(onClose).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1499);
      expect(getToast()).not.toBeNull();
      vi.advanceTimersByTime(1);
      expect(getToast()).toBeNull();
      expect(previousOnClose).toHaveBeenCalledTimes(1);
      expect(previousOnDestroy).not.toHaveBeenCalled();
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onDestroy).toHaveBeenCalledTimes(1);
    });

    it('replaces a timed toast with a persistent toast without leaving the old timer active', () => {
      const onDestroy = vi.fn();
      ToastPlugin({ message: '定时提示', duration: 1000, onDestroy });
      vi.advanceTimersByTime(500);
      ToastPlugin({ message: '常驻提示', duration: 0 });
      vi.advanceTimersByTime(60 * 1000);
      expect(getToast()?.textContent).toContain('常驻提示');
      expect(onDestroy).not.toHaveBeenCalled();
    });

    it.each(['string', 'function'] as const)('attach[%s]', (type) => {
      const container = document.createElement('div');
      container.id = 'toast-attach';
      const existingChild = document.createElement('span');
      existingChild.textContent = '原有内容';
      container.appendChild(existingChild);
      document.body.appendChild(container);

      ToastPlugin({ message: '指定节点挂载', attach: type === 'string' ? '#toast-attach' : () => container });
      expect(container.querySelector(`.${name}`)).toBeTruthy();

      ToastPlugin.clear();
      expect(container.querySelector(`.${name}`)).toBeNull();
      expect(container.children.length).toBe(1);
      expect(container.firstElementChild).toBe(existingChild);
      container.remove();
    });

    it('className[string]', () => {
      ToastPlugin({ message: '自定义类名', className: 'custom-toast another-toast' });
      const root = getToast()?.parentElement;
      expect(root?.classList.contains('custom-toast')).toBe(true);
      expect(root?.classList.contains('another-toast')).toBe(true);
    });

    it('style[string]', () => {
      ToastPlugin({ message: '字符串样式', style: 'color: rgb(255, 0, 0); z-index: 3000;' });
      const style = getToast()?.parentElement?.style;
      expect(style?.color).toBe('rgb(255, 0, 0)');
      expect(style?.zIndex).toBe('3000');
    });

    it('style[object]', () => {
      ToastPlugin({ message: '对象样式', style: { color: 'rgb(0, 0, 255)', zIndex: 4000 } });
      const style = getToast()?.parentElement?.style;
      expect(style?.color).toBe('rgb(0, 0, 255)');
      expect(style?.zIndex).toBe('4000');
    });

    it('releases the toast scroll lock and prevents scroll-through on the overlay', () => {
      document.body.classList.add('toast-test-page');
      ToastPlugin({ message: '锁定滚动', preventScrollThrough: true, showOverlay: true });
      expect(document.body.classList.contains(`${name}--lock`)).toBe(true);
      const overlay = document.querySelector(`.${prefix}-overlay`);
      expect(overlay).not.toBeNull();
      const event = new Event('touchmove', { bubbles: true, cancelable: true });
      overlay?.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
      ToastPlugin.clear();
      expect(getToast()).toBeNull();
      expect(document.body.classList.contains(`${name}--lock`)).toBe(false);
      expect(document.body.classList.contains('toast-test-page')).toBe(true);
    });

    it('does not leave a scroll lock when replacing a locking toast with a normal toast', () => {
      ToastPlugin({ message: '锁定提示', preventScrollThrough: true, showOverlay: true });
      ToastPlugin({ message: '普通提示' });
      expect(getToast()?.textContent).toContain('普通提示');
      expect(document.body.classList.contains(`${name}--lock`)).toBe(false);
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

    it('returns without creating DOM nodes outside a browser environment', async () => {
      vi.resetModules();
      vi.doMock('../../shared', async (importOriginal) => ({
        ...(await importOriginal<typeof import('../../shared')>()),
        isBrowser: false,
      }));
      try {
        const { ToastPlugin: serverToast } = await import('../plugin');
        const createElement = vi.spyOn(document, 'createElement');
        expect(serverToast('服务端消息')).toBeUndefined();
        expect(serverToast.success('服务端成功消息')).toBeUndefined();
        expect(() => serverToast.clear()).not.toThrow();
        expect(createElement).not.toHaveBeenCalled();
      } finally {
        vi.doUnmock('../../shared');
        vi.resetModules();
      }
    });
  });
});
