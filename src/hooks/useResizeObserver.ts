import { Ref, onMounted, onUnmounted, watch, unref } from 'vue';

export interface UseResizeObserverOptions {
  /**
   * 尺寸从 0 变为非 0 时触发回调（用于 v-show 场景）
   * @default false
   */
  onVisibilityChange?: boolean;
  /**
   * 任意尺寸变化时触发回调
   * @default true
   */
  onResize?: boolean;
  /**
   * 是否立即开始观察
   * @default true
   */
  immediate?: boolean;
}

export interface ResizeCallbackParams {
  width: number;
  height: number;
  entry: ResizeObserverEntry;
  /** 是否从不可见变为可见（尺寸从 0 变为非 0） */
  becameVisible: boolean;
}

export type ResizeCallback = (params: ResizeCallbackParams) => void;

type TargetRef = Ref<HTMLElement | null | undefined> | HTMLElement | null | undefined;

interface Size {
  width: number;
  height: number;
}

/** 对比前后尺寸，得出「是否变化」与「是否从不可见变为可见」 */
function getSizeChange(prev: Size, curr: Size) {
  const wasHidden = prev.width === 0 || prev.height === 0;
  const isVisible = curr.width > 0 && curr.height > 0;
  return {
    becameVisible: wasHidden && isVisible,
    sizeChanged: curr.width !== prev.width || curr.height !== prev.height,
  };
}

/**
 * 监听元素尺寸变化的通用 hook，并支持识别元素从不可见变为可见（v-show 场景）
 *
 * @param target 目标元素或 Ref
 * @param callback 尺寸变化时的回调
 * @param options 配置项
 *
 * @example
 * // 监听尺寸变化
 * useResizeObserver(elRef, ({ width, height }) => {});
 *
 * @example
 * // 仅监听可见性变化（v-show 场景）
 * useResizeObserver(elRef, ({ becameVisible }) => {}, { onVisibilityChange: true, onResize: false });
 */
export function useResizeObserver(target: TargetRef, callback: ResizeCallback, options: UseResizeObserverOptions = {}) {
  const { onVisibilityChange = false, onResize = true, immediate = true } = options;

  // 环境不支持时返回空实现，避免注册无效的生命周期钩子（与 tdesign-vue-next 对齐）
  if (typeof ResizeObserver === 'undefined') {
    return {
      isSupported: false,
      stop: () => {},
      start: () => {},
    };
  }

  // 仅内部记录，无响应式依赖，用普通变量避免多余的 reactivity 开销
  let lastSize: Size = { width: 0, height: 0 };
  let observer: ResizeObserver | null = null;
  // 观察状态：由 start/stop 控制，决定 target 变化时是否自动重建观察
  let isObserving = false;

  const disconnect = () => {
    observer?.disconnect();
    observer = null;
  };

  // 处理单次 entry：计算尺寸语义并按配置决定是否触发回调
  const handleEntry = (entry: ResizeObserverEntry) => {
    const { width, height } = entry.contentRect;
    const { becameVisible, sizeChanged } = getSizeChange(lastSize, { width, height });
    lastSize = { width, height };

    // becameVisible 时尺寸必然已变化（0 → 非 0），因此不能让它跳过 onResize，
    // 否则元素重新可见（如 keep-alive 激活）后尺寸无法更新
    const shouldTrigger = (onVisibilityChange && becameVisible) || (onResize && sizeChanged);
    if (shouldTrigger) {
      callback({ width, height, entry, becameVisible });
    }
  };

  const observe = () => {
    disconnect();

    const element = unref(target);
    if (!element) return;

    lastSize = {
      width: element.offsetWidth || 0,
      height: element.offsetHeight || 0,
    };

    observer = new ResizeObserver((entries) => entries.forEach(handleEntry));
    observer.observe(element);
  };

  const start = () => {
    isObserving = true;
    observe();
  };

  const stop = () => {
    isObserving = false;
    disconnect();
  };

  // target 变化时，仅在观察中才对新元素重建观察，避免未 start 时被意外启动
  if (typeof target === 'object' && target !== null && 'value' in target) {
    watch(
      () => unref(target),
      (newEl, oldEl) => {
        if (newEl !== oldEl && isObserving) {
          observe();
        }
      },
      { flush: 'post' },
    );
  }

  onMounted(() => {
    if (immediate) {
      start();
    }
  });

  onUnmounted(stop);

  return {
    /** 是否支持 ResizeObserver */
    isSupported: true,
    /** 手动停止观察 */
    stop,
    /** 手动开始观察 */
    start,
  };
}

/**
 * 监听元素从不可见变为可见（v-show 场景的语法糖）
 *
 * @param target 目标元素或 Ref
 * @param callback 元素变为可见时的回调
 *
 * @example
 * useVisibilityObserver(elRef, () => updateLayout());
 */
export function useVisibilityObserver(target: TargetRef, callback: () => void) {
  return useResizeObserver(
    target,
    ({ becameVisible }) => {
      if (becameVisible) {
        callback();
      }
    },
    { onVisibilityChange: true, onResize: false },
  );
}

export default useResizeObserver;
