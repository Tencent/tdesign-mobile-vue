import { ref, Ref, unref, watch, onMounted, onUnmounted } from 'vue';

export type ElementOrRef = string | Element | null | undefined;

export interface UseElementRectOptions {
  /** 是否立即计算边界 */
  immediate?: boolean;
  /** 是否监听元素尺寸变化 */
  resizeObserver?: boolean;
}

export interface ElementRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

/**
 * 解析元素，支持：字符串选择器、Element 对象
 * @param element 元素或选择器
 * @returns HTMLElement
 */
function resolveElement(element: ElementOrRef): HTMLElement | null {
  if (!element) return null;

  if (typeof element === 'string') {
    // 字符串选择器
    return document.querySelector(element);
  }

  if (element instanceof HTMLElement) {
    // 直接传入的 HTMLElement
    return element;
  }

  return null;
}

/**
 * 获取元素的边界信息
 * @param element HTMLElement
 * @returns ElementRect
 */
function getElementRect(element: HTMLElement): ElementRect {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * 用于获取和监听元素边界信息的 hook
 * @param element 元素或选择器，支持 Ref<...> 类型
 * @param options 配置选项
 * @returns 返回元素引用和边界信息
 *
 * @example
 * // 基础用法
 * const { element, rect } = useElementRect(myRef);
 *
 * @example
 * // 只需要高度（兼容 useElementHeight）
 * const { rect: { height } } = useElementRect(myRef);
 *
 * @example
 * // 监听元素尺寸变化
 * const { element, rect } = useElementRect(myRef, { resizeObserver: true });
 *
 * @example
 * // 延迟计算
 * const { element, rect, updateElement } = useElementRect(myRef, { immediate: false });
 */
export default function useElementRect(element: Ref<ElementOrRef> | ElementOrRef, options: UseElementRectOptions = {}) {
  const { immediate = true, resizeObserver = false } = options;
  const elementRef = ref<HTMLElement | null>(null);
  const rect = ref<ElementRect>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  });
  let resizeObserverInstance: ResizeObserver | null = null;

  const updateElement = () => {
    // 使用 unref 统一处理 Ref 和非 Ref 类型
    const elementValue = unref(element);
    const el = resolveElement(elementValue);
    elementRef.value = el;

    if (el) {
      rect.value = getElementRect(el);
    }
  };

  const setupResizeObserver = () => {
    if (!resizeObserver) return;

    const currentElement = elementRef.value;
    if (currentElement && window.ResizeObserver) {
      resizeObserverInstance = new ResizeObserver(() => {
        rect.value = getElementRect(currentElement);
      });
      resizeObserverInstance.observe(currentElement);
    }
  };

  const cleanupResizeObserver = () => {
    if (resizeObserverInstance) {
      resizeObserverInstance.disconnect();
      resizeObserverInstance = null;
    }
  };

  // 监听 element 参数变化
  watch(
    () => unref(element),
    () => {
      cleanupResizeObserver();
      updateElement();
      setupResizeObserver();
    },
    { flush: 'post' },
  );

  onMounted(() => {
    if (immediate) {
      updateElement();
      setupResizeObserver();
    }
  });

  onUnmounted(() => {
    cleanupResizeObserver();
  });

  return {
    element: elementRef,
    rect,
    updateElement,
  };
}

/**
 * @deprecated 使用 useElementRect 替代
 * 用于计算元素高度的 hook
 * @param target 元素 ref
 * @param options 配置选项
 * @returns 返回高度和重新计算的方法
 */
export function useElementHeight(target: Ref<HTMLElement | undefined>, options: UseElementRectOptions = {}) {
  const { rect } = useElementRect(target, options);

  return {
    height: ref(() => rect.value.height),
    calculateHeight: () => {
      // useElementRect 内部会自动更新，这里保持兼容性
    },
  };
}

export { resolveElement, getElementRect };
