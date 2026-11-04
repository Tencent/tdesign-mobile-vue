import { h, nextTick, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import useElementRect from '../useElementRect';
import useMutationObservable from '../useMutationObservable';
import useTeleport from '../useTeleport';

describe('hooks', () => {
  describe('useElementRect', () => {
    it('resolves an element and reads its bounding rectangle', () => {
      const element = document.createElement('div');
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: 1,
        bottom: 21,
        left: 2,
        right: 32,
        width: 30,
        height: 20,
        x: 2,
        y: 1,
        toJSON: () => ({}),
      });
      let api: ReturnType<typeof useElementRect>;
      mount(
        defineComponent({
          setup() {
            api = useElementRect(element);
            return () => h('div');
          },
        }),
      );
      expect(api!.element.value).toBe(element);
      expect(api!.rect.value).toMatchObject({ top: 1, width: 30, height: 20 });
    });

    it('keeps the zero rectangle until update when immediate is false', () => {
      const element = document.createElement('div');
      let api: ReturnType<typeof useElementRect>;
      mount(
        defineComponent({
          setup() {
            api = useElementRect(element, { immediate: false });
            return () => h('div');
          },
        }),
      );
      expect(api!.element.value).toBe(null);
      api!.updateElement();
      expect(api!.element.value).toBe(element);
    });
  });

  describe('useTeleport', () => {
    it('resolves an attach selector after mount', () => {
      const target = document.createElement('div');
      target.id = 'teleport-target';
      document.body.appendChild(target);
      let element: ReturnType<typeof useTeleport>;
      mount(
        defineComponent({
          setup() {
            element = useTeleport('#teleport-target');
            return () => h('div');
          },
        }),
      );
      expect(element!.value).toBe(target);
      target.remove();
    });
  });

  describe('useMutationObservable', () => {
    let originalMutationObserver: typeof MutationObserver;

    beforeEach(() => {
      originalMutationObserver = window.MutationObserver;
    });

    afterEach(() => {
      window.MutationObserver = originalMutationObserver;
    });

    it('observes mutations and disconnects on unmount', async () => {
      const observe = vi.fn();
      const disconnect = vi.fn();
      window.MutationObserver = vi.fn(() => ({ observe, disconnect }) as any) as any;
      const target = document.createElement('div');
      const callback = vi.fn();
      const wrapper = mount(
        defineComponent({
          setup() {
            useMutationObservable(target, callback);
            return () => h('div');
          },
        }),
      );
      await nextTick();
      expect(observe).toHaveBeenCalledWith(target, expect.objectContaining({ childList: true }));
      wrapper.unmount();
      expect(disconnect).toHaveBeenCalled();
    });
  });
});
