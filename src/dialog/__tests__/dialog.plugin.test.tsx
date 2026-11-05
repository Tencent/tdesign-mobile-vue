import { DOMWrapper, enableAutoUnmount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { DialogPlugin } from '../index';
import type { DialogInstance } from '../type';
import { finishTransitions } from '@/test/flush';

const body = new DOMWrapper(document.body);
let handler: DialogInstance | undefined;

beforeEach(() => {
  vi.useFakeTimers();
});

enableAutoUnmount((unmount) => {
  afterEach(async () => {
    if (handler) {
      // 隐藏态直接 destroy 不会触发 closed，先显示以确保插件创建的 app 能卸载。
      // 必须先完成离场及重新入场，避免清空 DOM 后仍有过渡回调执行。
      await finishTransitions();
      handler.show();
      await finishTransitions();
      handler.destroy();
      await finishTransitions();
      expect(body.find('.t-dialog').exists()).toBe(false);
      expect(body.find('.t-overlay').exists()).toBe(false);
    }
    unmount();
    document.body.innerHTML = '';
    handler = undefined;
    vi.useRealTimers();
  });
});

describe('DialogPlugin', () => {
  it.each(['show', 'alert', 'confirm'] as const)('%s[string]', async (method) => {
    handler = DialogPlugin[method](`Hello ${method}`);
    await nextTick();
    await nextTick();
    expect(body.get('.t-dialog__body').text()).toBe(`Hello ${method}`);
    expect(body.get('.t-dialog').isVisible()).toBe(true);
  });
});
