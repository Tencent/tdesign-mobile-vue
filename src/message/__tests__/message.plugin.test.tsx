import { afterEach, describe, expect, it } from 'vitest';
import { MessagePlugin } from '../index';
import { flush } from '../../../test/utils/flush';

describe('MessagePlugin', () => {
  it.each(['info', 'success', 'warning', 'error'] as const)('%s renders a themed message', async (method) => {
    MessagePlugin[method](`Hello ${method}`);
    await flush();
    const message = document.querySelector('.t-message');
    expect(message?.classList.contains(`t-message--${method}`)).toBe(true);
    expect(document.querySelector('.t-message__text')?.textContent).toBe(`Hello ${method}`);
  });

  afterEach(() => {
    MessagePlugin.closeAll();
    document.body.innerHTML = '';
  });
});
