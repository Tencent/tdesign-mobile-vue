import { DOMWrapper, enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
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
  describe('scenarios', () => {
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

    it('hide', async () => {
      const handler = createDrawer({ items: [{ title }] });
      handler.show();
      await nextTick();
      expect(body.get('.t-drawer').isVisible()).toBe(true);

      handler.hide();
      await nextTick();
      await vi.waitFor(() => {
        expect(body.get('.t-drawer').isVisible()).toBe(false);
      });
      expect(document.querySelector('.t-drawer')).not.toBeNull();
    });

    it('update', async () => {
      const handler = createDrawer({ items: [{ title }] });
      expect(document.body.textContent).toContain(title);
      handler.show();
      await nextTick();

      handler.update({ items: [{ title: 'Hello Vue' }] });
      await nextTick();
      expect(document.body.textContent).not.toContain(title);
      expect(document.body.textContent).toContain('Hello Vue');
      expect(body.get('.t-drawer').isVisible()).toBe(true);
    });

    it('destroy', async () => {
      const handler = createDrawer({ items: [{ title }] });
      expect(document.body.textContent).toContain(title);

      handler.destroy();
      handlers.delete(handler);
      await nextTick();
      expect(document.body.textContent).not.toContain(title);
      expect(document.querySelector('.t-drawer')).toBeNull();
    });

    it('destroys a visible drawer', async () => {
      const handler = createDrawer({ items: [{ title }] });
      handler.show();
      await nextTick();
      expect(body.get('.t-drawer').isVisible()).toBe(true);

      handler.destroy();
      handlers.delete(handler);
      await nextTick();
      await vi.waitFor(() => {
        expect(document.querySelector('.t-drawer')).toBeNull();
        expect(document.querySelector('.t-overlay')).toBeNull();
      });
      expect(document.body.textContent).not.toContain(title);
      expect(document.body.classList.contains('t-popup--lock')).toBe(false);
    });

    it('installs as a global plugin exposing $drawer', () => {
      const wrapper = mount(() => <div />, { global: { plugins: [DrawerPlugin] } });
      const { $drawer } = wrapper.vm as unknown as { $drawer: typeof DrawerPlugin };
      expect(typeof $drawer).toBe('function');
      expect(document.body.textContent).not.toContain(title);

      const handler = $drawer({ items: [{ title }] });
      handlers.add(handler);
      expect(document.body.textContent).toContain(title);
    });
  });
});
