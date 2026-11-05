import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastPlugin } from '../index';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-toast`;

const getToast = () => document.querySelector(`.${name}`);

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
});
