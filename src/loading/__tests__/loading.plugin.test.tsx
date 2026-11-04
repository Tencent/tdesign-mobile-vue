import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LoadingPlugin } from '../index';

// 浮层 teleport 到 body，用例结束后清理残留节点与 body 锁定类名
afterEach(() => {
  document.body.innerHTML = '';
  document.body.className = '';
});

describe('LoadingPlugin', () => {
  describe('scenarios', () => {
    it('show', async () => {
      expect(document.body.querySelector('.t-loading')).toBeFalsy();

      const handler = await LoadingPlugin({ content: 'hello', loading: true });
      expect(document.body.textContent).toContain('hello');
      expect(document.body.querySelector('.t-loading')).toBeTruthy();

      handler.hide();
      expect(document.body.querySelector('.t-loading')).toBeFalsy();
    });

    it('installs as a global plugin exposing $loading', async () => {
      const wrapper = mount(() => <div></div>, { global: { plugins: [LoadingPlugin] } });
      const { $loading } = wrapper.vm as unknown as { $loading: typeof LoadingPlugin };
      expect(document.body.textContent).not.toContain('测试');
      await $loading({ content: '测试' });
      expect(document.body.textContent).toContain('测试');

      await $loading(true);
      expect(document.body.querySelector('.t-loading--fullscreen')).toBeTruthy();
      expect(document.body.classList.contains('t-loading--lock')).toBe(true);

      await $loading(false);
      expect(document.body.querySelector('.t-loading--fullscreen')).toBeFalsy();
      expect(document.body.classList.contains('t-loading--lock')).toBe(false);
    });

    it('reuses the fullscreen instance while it is visible', async () => {
      const first = await LoadingPlugin(true);
      const second = await LoadingPlugin(true);
      expect(second).toBe(first);
      // 全屏实例仅一份 DOM
      expect(document.body.querySelectorAll('.t-loading--fullscreen')).toHaveLength(1);

      await LoadingPlugin(false);
      expect(document.body.querySelector('.t-loading--fullscreen')).toBeFalsy();
    });

    it('attaches to a custom container and cleans it up on hide', async () => {
      const container = document.createElement('div');
      container.id = 'plugin-attach';
      document.body.appendChild(container);

      const handler = await LoadingPlugin({ attach: '#plugin-attach', content: '局部加载' });
      expect(container.querySelector('.t-loading')).toBeTruthy();
      expect(container.classList.contains('t-loading__parent--relative')).toBe(true);

      handler.hide();
      expect(container.querySelector('.t-loading')).toBeFalsy();
      expect(container.classList.contains('t-loading__parent--relative')).toBe(false);
    });

    it('logs an error when the attach target does not exist', () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      try {
        const handler = LoadingPlugin({ attach: '#plugin-not-exist' });
        expect(error).toHaveBeenCalledWith('attach is not exist');
        handler.hide();
      } finally {
        error.mockRestore();
      }
    });
  });
});
