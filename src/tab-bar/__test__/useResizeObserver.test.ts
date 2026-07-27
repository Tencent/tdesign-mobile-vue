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

  describe('启停控制（根因1）', () => {
    it('immediate 默认 true：挂载后立即观察目标元素', () => {
      const el = document.createElement('div');
      mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(el), vi.fn()) }));

      expect(observedEls()).toContain(el);
    });

    it('immediate:false：挂载后不观察', () => {
      const el = document.createElement('div');
      mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(el), vi.fn(), { immediate: false }) }));

      expect(MockResizeObserver.instances.length).toBe(0);
    });

    it('未调用 start 时 target 变化不会自动启动观察（根因1核心回归防护）', async () => {
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

    it('调用 start() 后，target 变化会断开旧元素并观察新元素', async () => {
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

    it('调用 stop() 后断开观察，且后续 target 变化不再自动重建', async () => {
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

    it('组件卸载时自动断开观察', () => {
      const el = document.createElement('div');
      const { wrapper } = mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(el), vi.fn()) }));

      const obs = latest();
      wrapper.unmount();

      expect(obs.disconnectCount).toBeGreaterThan(0);
    });

    it('环境不支持 ResizeObserver 时 isSupported 为 false 且不创建观察器', () => {
      (window as any).ResizeObserver = undefined;
      const el = document.createElement('div');
      const { api } = mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(el), vi.fn()) }));

      expect(api.isSupported).toBe(false);
      expect(MockResizeObserver.instances.length).toBe(0);
    });
  });

  describe('回调触发逻辑（shouldTrigger / issue #2270）', () => {
    it('onResize 场景下尺寸 0→非0（becameVisible）也触发回调，且 becameVisible 为 true', () => {
      const cb = vi.fn();
      mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(document.createElement('div')), cb) }));

      latest().trigger(100, 50);

      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb.mock.calls[0][0]).toMatchObject({ width: 100, height: 50, becameVisible: true });
    });

    it('普通尺寸变化触发回调，becameVisible 为 false', () => {
      const cb = vi.fn();
      mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(document.createElement('div')), cb) }));

      const o = latest();
      o.trigger(100, 50); // 0 → 非0，becameVisible
      o.trigger(120, 50); // 普通尺寸变化

      expect(cb).toHaveBeenCalledTimes(2);
      expect(cb.mock.calls[1][0]).toMatchObject({ width: 120, becameVisible: false });
    });

    it('尺寸未变化时不触发回调', () => {
      const cb = vi.fn();
      mountWithHook(() => ({ ...useResizeObserver(ref<HTMLElement | null>(document.createElement('div')), cb) }));

      const o = latest();
      o.trigger(100, 50);
      o.trigger(100, 50);

      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('onResize:false 且 onVisibilityChange:false 时不触发任何回调', () => {
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

    it('useVisibilityObserver 仅在不可见→可见时触发一次', () => {
      const cb = vi.fn();
      mountWithHook(() => ({ ...useVisibilityObserver(ref<HTMLElement | null>(document.createElement('div')), cb) }));

      const o = latest();
      o.trigger(100, 50); // becameVisible → 触发
      o.trigger(120, 60); // 已可见的普通变化 → onResize:false，不触发

      expect(cb).toHaveBeenCalledTimes(1);
    });
  });
});
