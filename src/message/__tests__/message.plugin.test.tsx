import { mount } from '@vue/test-utils';
import { nextTick, type Plugin } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MessagePlugin } from '../index';

// 等待插件 create 内 nextTick 后的 visible 翻转与渲染
const flush = async () => {
  await nextTick();
  await nextTick();
};

describe('MessagePlugin', () => {
  describe('scenarios', () => {
    it.each(['info', 'success', 'warning', 'error'] as const)('%s renders a themed message', async (method) => {
      MessagePlugin[method](`Hello ${method}`);
      await flush();
      const message = document.querySelector('.t-message');
      expect(message?.classList.contains(`t-message--${method}`)).toBe(true);
      expect(document.querySelector('.t-message__text')?.textContent).toBe(`Hello ${method}`);
    });

    it('accepts object options', async () => {
      MessagePlugin.info({ content: '对象消息', closeBtn: '知道了' });
      await flush();
      expect(document.querySelector('.t-message__text')?.textContent).toBe('对象消息');
      expect(document.querySelector('.t-message__close-wrap')?.textContent).toBe('知道了');
    });

    it('notifies durationEnd when the timer finishes', async () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      MessagePlugin.info({ content: '自动关闭', duration: 1000, onDurationEnd });
      await vi.advanceTimersByTimeAsync(1000);
      expect(onDurationEnd).toHaveBeenCalledExactlyOnceWith();
      vi.useRealTimers();
    });

    it('notifies closeBtnClick and hides the message', async () => {
      const onCloseBtnClick = vi.fn();
      MessagePlugin.info({ content: '可关闭消息', closeBtn: true, onCloseBtnClick });
      await flush();
      (document.querySelector('.t-message__close-wrap') as HTMLElement).click();
      await nextTick();
      expect(onCloseBtnClick).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent) });
    });

    it('closeAll removes every mounted instance', async () => {
      MessagePlugin.info('第一条');
      MessagePlugin.info('第二条');
      await flush();
      expect(document.querySelectorAll('.t-message')).toHaveLength(2);

      MessagePlugin.closeAll();
      expect(document.querySelectorAll('.t-message')).toHaveLength(0);
    });

    it('mounts to a custom context container', async () => {
      const container = document.createElement('div');
      container.id = 'plugin-context';
      document.body.appendChild(container);

      MessagePlugin.info({ content: '局部消息', context: container });
      await flush();
      expect(container.querySelector('.t-message__text')?.textContent).toBe('局部消息');

      MessagePlugin.closeAll();
      container.remove();
    });

    it('logs an error when the context does not exist', () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      try {
        MessagePlugin.info({ content: '无效挂载', context: null });
        expect(error).toHaveBeenCalledWith('未找到组件, 请确认 context 是否正确');
        expect(document.querySelector('.t-message')).toBeNull();
      } finally {
        error.mockRestore();
      }
    });

    it('installs as a global plugin exposing $message', async () => {
      const wrapper = mount(() => <div />, { global: { plugins: [MessagePlugin as unknown as Plugin] } });
      const { $message } = wrapper.vm as unknown as { $message: typeof MessagePlugin };
      expect($message).toBe(MessagePlugin);

      $message.info('全局消息');
      await flush();
      expect(document.querySelector('.t-message__text')?.textContent).toBe('全局消息');
    });
  });

  afterEach(() => {
    MessagePlugin.closeAll();
    document.body.innerHTML = '';
  });
});
