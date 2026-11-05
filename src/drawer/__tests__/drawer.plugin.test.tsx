import { DOMWrapper, enableAutoUnmount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { DrawerPlugin } from '../plugin';
import { sleep } from '../../shared/util';

const title = 'Hello TDesign';
const body = new DOMWrapper(document.body);
const handlers = new Set<NonNullable<ReturnType<typeof DrawerPlugin>>>();

const createDrawer = (options: Parameters<typeof DrawerPlugin>[0]) => {
  const handler = DrawerPlugin(options);
  handlers.add(handler);
  return handler;
};

enableAutoUnmount((unmount) => {
  afterEach(async () => {
    handlers.forEach((handler) => handler.destroy());
    handlers.clear();
    await nextTick();
    await sleep(300);
    unmount();
    document.body.innerHTML = '';
  });
});

describe('DrawerPlugin', () => {
  it('show', async () => {
    expect(document.querySelector('.t-drawer')).toBeNull();
    const handler = createDrawer({ items: [{ title }] });
    expect(document.body.textContent).toContain(title);
    expect(document.querySelector('.t-drawer')).not.toBeNull();
    expect(body.get('.t-drawer').isVisible()).toBe(false);

    handler.show();
    await nextTick();
    expect(body.get('.t-drawer').isVisible()).toBe(true);
  });
});
