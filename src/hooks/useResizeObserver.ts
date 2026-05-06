import { ref, Ref, onMounted, onUnmounted, watch, unref } from 'vue';

export interface UseResizeObserverOptions {
  /**
   * 是否在尺寸从 0 变为非 0 时触发回调（用于处理 v-show 场景）
   * @default false
   */
  onVisibilityChange?: boolean;
  /**
   * 是否在任何尺寸变化时都触发回调
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
  /** 是否是从不可见变为可见（尺寸从 0 变为非 0） */
  becameVisible: boolean;
}

export type ResizeCallback = (params: ResizeCallbackParams) => void;

/**
 * 通用的 ResizeObserver hook
 * 支持监听元素尺寸变化，以及元素从不可见变为可见（v-show 场景）
 *
 * @param target 目标元素或 Ref
 * @param callback 尺寸变化时的回调函数
 * @param options 配置选项
 *
 * @example
 * // 基础用法 - 监听尺寸变化
 * useResizeObserver(elementRef, ({ width, height }) => {
 *   console.log('尺寸变化:', width, height);
 * });
 *
 * @example
 * // 只监听可见性变化（v-show 场景）
 * useResizeObserver(elementRef, ({ becameVisible }) => {
 *   if (becameVisible) {
 *     console.log('元素变为可见');
 *   }
 * }, { onVisibilityChange: true, onResize: false });
 *
 * @example
 * // 同时监听尺寸变化和可见性变化
 * useResizeObserver(elementRef, ({ width, height, becameVisible }) => {
 *   if (becameVisible) {
 *     // 元素从隐藏变为可见，重新初始化
 *     initComponent();
 *   }
 * }, { onVisibilityChange: true });
 */
export function useResizeObserver(
  target: Ref<HTMLElement | null | undefined> | HTMLElement | null | undefined,
  callback: ResizeCallback,
  options: UseResizeObserverOptions = {},
) {
  const { onVisibilityChange = false, onResize = true, immediate = true } = options;

  const isSupported = typeof ResizeObserver !== 'undefined';
  const previousSize = ref({ width: 0, height: 0 });
  let observer: ResizeObserver | null = null;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  const observe = () => {
    cleanup();

    const element = unref(target);
    if (!element || !isSupported) return;

    // 初始化 previousSize
    previousSize.value = {
      width: element.offsetWidth || 0,
      height: element.offsetHeight || 0,
    };

    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const { width: prevWidth, height: prevHeight } = previousSize.value;

        // 检测是否从不可见变为可见（宽度或高度从 0 变为非 0）
        const wasHidden = prevWidth === 0 || prevHeight === 0;
        const isVisible = width > 0 && height > 0;
        const becameVisible = wasHidden && isVisible;

        // 检测尺寸是否发生变化
        const sizeChanged = width !== prevWidth || height !== prevHeight;

        // 更新记录的尺寸
        previousSize.value = { width, height };

        // 根据配置决定是否触发回调
        const shouldTrigger = (onVisibilityChange && becameVisible) || (onResize && sizeChanged && !becameVisible);

        if (shouldTrigger) {
          callback({
            width,
            height,
            entry,
            becameVisible,
          });
        }
      }
    });

    observer.observe(element);
  };

  // 监听 target 变化
  if (typeof target === 'object' && target !== null && 'value' in target) {
    watch(
      () => unref(target),
      (newEl, oldEl) => {
        if (newEl !== oldEl) {
          observe();
        }
      },
      { flush: 'post' },
    );
  }

  onMounted(() => {
    if (immediate) {
      observe();
    }
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    /** 是否支持 ResizeObserver */
    isSupported,
    /** 手动停止观察 */
    stop: cleanup,
    /** 手动开始观察 */
    start: observe,
  };
}

/**
 * 监听元素从不可见变为可见（专门用于 v-show 场景）
 *
 * @param target 目标元素或 Ref
 * @param callback 元素变为可见时的回调
 *
 * @example
 * useVisibilityObserver(elementRef, () => {
 *   // 元素变为可见，重新计算布局
 *   updateLayout();
 * });
 */
export function useVisibilityObserver(
  target: Ref<HTMLElement | null | undefined> | HTMLElement | null | undefined,
  callback: () => void,
) {
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
