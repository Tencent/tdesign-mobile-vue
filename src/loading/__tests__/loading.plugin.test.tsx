import { afterEach, describe, expect, it } from 'vitest';
import { LoadingPlugin } from '../index';

// 浮层 teleport 到 body，用例结束后清理残留节点与 body 锁定类名
afterEach(() => {
  document.body.innerHTML = '';
  document.body.className = '';
});

describe('LoadingPlugin', () => {
  it('show', async () => {
    expect(document.body.querySelector('.t-loading')).toBeFalsy();

    const handler = await LoadingPlugin({ content: 'hello', loading: true });
    expect(document.body.textContent).toContain('hello');
    expect(document.body.querySelector('.t-loading')).toBeTruthy();

    handler.hide();
    expect(document.body.querySelector('.t-loading')).toBeFalsy();
  });
});
