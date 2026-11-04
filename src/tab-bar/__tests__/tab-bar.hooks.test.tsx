import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref, nextTick } from 'vue';
import { useResizeObserver, useVisibilityObserver } from '../../hooks/useResizeObserver';

/**
 * jsdom 未实现 ResizeObserver，这里提供一个可观测的 Mock：
 * - 记录每个观察器 observe / disconnect 的调用情况
 * - 通过 trigger 主动模拟一次尺寸变化回调
 * 以便断言启停控制与回调触发逻辑。
 */
type MockResizeCallback = (entries: Array<{ contentRect: { width: number; height: number } }>) => void;

class MockResizeObserver {
  static instances: MockResizeObserver[] = [];

  static reset() {
    MockResizeObserver.instances = [];
  }

  callback: MockResizeCallback;

  observed: Element[] = [];

  disconnectCount = 0;

  constructor(callback: MockResizeCallback) {
    this.callback = callback;
    MockResizeObserver.instances.push(this);
  }

  observe(el: Element) {
    this.observed.push(el);
  }

  // eslint-disable-next-line class-methods-use-this
  unobserve() {}

  disconnect() {
    this.disconnectCount += 1;
  }

  /** 手动模拟一次尺寸变化回调 */
  trigger(width: number, height: number) {
    this.callback([{ contentRect: { width, height } }]);
  }
}

/** 挂载一个宿主组件以驱动 hook 的生命周期，并把 hook 返回值暴露出来 */
function mountWithHook<T extends Record<string, any>>(run: () => T): { wrapper: ReturnType<typeof mount>; api: T } {
  const api = {} as T;
  const Comp = defineComponent({
    setup() {
      Object.assign(api, run());
      return () => h('div');
    },
  });
  const wrapper = mount(Comp);
  return { wrapper, api };
}

/** 当前最新创建的观察器实例 */
const latest = () => MockResizeObserver.instances[MockResizeObserver.instances.length - 1];
/** 所有被观察过的元素 */
const observedEls = () => MockResizeObserver.instances.flatMap((o) => o.observed);

describe('useResizeObserver', () => {
  let OriginalResizeObserver: typeof ResizeObserver;

  beforeEach(() => {
    OriginalResizeObserver = window.ResizeObserver;
    MockResizeObserver.reset();
    (window as any).ResizeObserver = MockResizeObserver;
  });

  afterEach(() => {
    (window as any).ResizeObserver = OriginalResizeObserver;
  });

  describe('start/stop control (root cause 1)', () => {
    it('observes the target element right after mount when immediate defaults to true', () => {
      const el = document.createElement('div');
      mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(el), vi.fn()) }));

      expect(observedEls()).toContain(el);
    });

    it('does not observe after mount when immediate is false', () => {
      const el = document.createElement('div');
      mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(el), vi.fn(), { immediate: false }) }));

      expect(MockResizeObserver.instances.length).toBe(0);
    });

    it('does not auto-start observation when target changes before start is called (root cause 1 regression guard)', async () => {
      const el = document.createElement('div');
      const { api } = mountWithHook(() => {
        const elRef = ref<HTMLElement | null>(null);
        return { elRef, ...useResizeObserver(elRef, vi.fn(), { immediate: false }) };
      });

      api.elRef.value = el;
      await nextTick();

      expect(observedEls()).not.toContain(el);
      expect(MockResizeObserver.instances.length).toBe(0);
    });

    it('disconnects the old element and observes the new one on target change after start is called', async () => {
      const el1 = document.createElement('div');
      const el2 = document.createElement('div');
      const { api } = mountWithHook(() => {
        const elRef = ref<HTMLElement | null>(el1);
        return { elRef, ...useResizeObserver(elRef, vi.fn(), { immediate: false }) };
      });

      api.start();
      expect(observedEls()).toContain(el1);
      const prev = latest();

      api.elRef.value = el2;
      await nextTick();

      expect(prev.disconnectCount).toBeGreaterThan(0);
      expect(observedEls()).toContain(el2);
    });

    it('disconnects after stop and no longer rebuilds on subsequent target changes', async () => {
      const el1 = document.createElement('div');
      const el2 = document.createElement('div');
      const { api } = mountWithHook(() => {
        const elRef = ref<HTMLElement | null>(el1);
        return { elRef, ...useResizeObserver(elRef, vi.fn()) };
      });

      const first = latest();
      expect(first.observed).toContain(el1);

      api.stop();
      expect(first.disconnectCount).toBeGreaterThan(0);

      const countBefore = MockResizeObserver.instances.length;
      api.elRef.value = el2;
      await nextTick();

      expect(MockResizeObserver.instances.length).toBe(countBefore);
      expect(observedEls()).not.toContain(el2);
    });

    it('disconnects automatically when the component unmounts', () => {
      const el = document.createElement('div');
      const { wrapper } = mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(el), vi.fn()) }));

      const obs = latest();
      wrapper.unmount();

      expect(obs.disconnectCount).toBeGreaterThan(0);
    });

    it('reports isSupported as false and creates no observer when ResizeObserver is unsupported', () => {
      (window as any).ResizeObserver = undefined;
      const el = document.createElement('div');
      const { api } = mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(el), vi.fn()) }));

      expect(api.isSupported).toBe(false);
      expect(MockResizeObserver.instances.length).toBe(0);
    });
  });

  // Issue: https://github.com/Tencent/tdesign-mobile-vue/issues/2270
  describe('callback triggering (shouldTrigger / issue #2270)', () => {
    it('triggers the callback with becameVisible true when size changes from 0 to non-zero', () => {
      const cb = vi.fn();
      mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(document.createElement('div')), cb) }));

      latest().trigger(100, 50);

      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb.mock.calls[0][0]).toMatchObject({ width: 100, height: 50, becameVisible: true });
    });

    it('triggers the callback with becameVisible false on ordinary size changes', () => {
      const cb = vi.fn();
      mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(document.createElement('div')), cb) }));

      const o = latest();
      o.trigger(100, 50); // 0 → 非0，becameVisible
      o.trigger(120, 50); // 普通尺寸变化

      expect(cb).toHaveBeenCalledTimes(2);
      expect(cb.mock.calls[1][0]).toMatchObject({ width: 120, becameVisible: false });
    });

    it('does not trigger the callback when size stays unchanged', () => {
      const cb = vi.fn();
      mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(document.createElement('div')), cb) }));

      const o = latest();
      o.trigger(100, 50);
      o.trigger(100, 50);

      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('triggers no callback when both onResize and onVisibilityChange are false', () => {
      const cb = vi.fn();
      mountWithHook(() => ({
        ...useResizeObserver(ref<HTMLElement | null>(document.createElement('div')), cb, {
          onResize: false,
          onVisibilityChange: false,
        }),
      }));

      latest().trigger(100, 50);

      expect(cb).not.toHaveBeenCalled();
    });

    it('useVisibilityObserver triggers only once on invisible-to-visible transition', () => {
      const cb = vi.fn();
      mountWithHook(() => ({ ...useVisibilityObserver(ref<HTMLElement | null>(document.createElement('div')), cb) }));

      const o = latest();
      o.trigger(100, 50); // becameVisible → 触发
      o.trigger(120, 60); // 已可见的普通变化 → onResize:false，不触发

      expect(cb).toHaveBeenCalledTimes(1);
    });
  });
});
