import { ref, Ref, nextTick, onMounted, onUnmounted } from 'vue';

export interface UseElementHeightOptions {
  /** 是否立即计算高度 */
  immediate?: boolean;
  /** 监听窗口大小变化 */
  resizeObserver?: boolean;
}

/**
 * 用于计算元素高度的 hook
 * @param target 元素 ref
 * @param options 配置选项
 * @returns 返回高度和重新计算的方法
 */
export default function useElementHeight(target: Ref<HTMLElement | undefined>, options: UseElementHeightOptions = {}) {
  const { immediate = true, resizeObserver = false } = options;
  const elementHeight = ref(0);
  let resizeObserverInstance: ResizeObserver | null = null;

  const calculateHeight = async () => {
    await nextTick();
    const currentElement = target.value;
    if (currentElement) {
      elementHeight.value = currentElement.getBoundingClientRect().height;
    }
  };

  const setupResizeObserver = () => {
    if (!resizeObserver) return;

    const currentElement = target.value;
    if (currentElement && window.ResizeObserver) {
      resizeObserverInstance = new ResizeObserver(() => {
        calculateHeight();
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

  onMounted(() => {
    if (immediate) {
      calculateHeight();
    }
    setupResizeObserver();
  });

  onUnmounted(() => {
    cleanupResizeObserver();
  });

  return {
    height: elementHeight,
    calculateHeight,
  };
}
