import type { ComputedRef, Ref } from 'vue';
import { computed, reactive, ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import { isObject } from 'lodash';

const noop = () => {};

type Position = {
  x: number;
  y: number;
};

/**
 * Maybe it's a ref, or a plain value
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T>
 * ```
 */
type MaybeRef<T> = T | Ref<T>;

export type UseSwipeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface UseSwipeOptions {
  /**
   * Register events as passive
   *
   * @default true
   */
  passive?: boolean;

  /**
   * @default 50
   */
  threshold?: number;

  /**
   * Listener options
   */
  listenerOptions?: boolean | { passive?: boolean; capture?: boolean };

  /**
   * Callback on swipe start
   */
  onSwipeStart?: (e: TouchEvent) => void;

  /**
   * Callback on swipe moves
   */
  onSwipe?: (e: TouchEvent) => void;

  /**
   * Callback on swipe ends
   */
  onSwipeEnd?: (e: TouchEvent, direction: UseSwipeDirection) => void;
}

export interface UseSwipeReturn {
  isPassiveEventSupported: boolean;
  isSwiping: Ref<boolean>;
  direction: ComputedRef<UseSwipeDirection>;
  coordsStart: Readonly<Position>;
  coordsEnd: Readonly<Position>;
  lengthX: ComputedRef<number>;
  lengthY: ComputedRef<number>;
  stop: () => void;
}

/**
 * Reactive swipe detection.
 *
 * @param target
 * @param options
 */
export function useSwipe(
  target: MaybeRef<EventTarget | null | undefined>,
  options = {} as UseSwipeOptions,
): UseSwipeReturn {
  const { threshold = 50, onSwipe, onSwipeEnd, onSwipeStart, listenerOptions = false } = options;

  const coordsStart = reactive<Position>({ x: 0, y: 0 });
  const coordsEnd = reactive<Position>({ x: 0, y: 0 });

  const diffX = computed(() => coordsStart.x - coordsEnd.x);
  const diffY = computed(() => coordsStart.y - coordsEnd.y);

  const { max, abs } = Math;
  const isThresholdExceeded = computed(() => max(abs(diffX.value), abs(diffY.value)) >= threshold);

  const isSwiping = ref(false);

  const direction = computed((): UseSwipeDirection => {
    if (!isThresholdExceeded.value) return 'none';

    if (abs(diffX.value) > abs(diffY.value)) {
      return diffX.value > 0 ? 'left' : 'right';
    }

    return diffY.value > 0 ? 'up' : 'down';
  });

  const getTouchEventCoords = (e: TouchEvent) => [e.touches[0].clientX, e.touches[0].clientY];

  const updateCoordsStart = (x: number, y: number) => {
    coordsStart.x = x;
    coordsStart.y = y;
  };

  const updateCoordsEnd = (x: number, y: number) => {
    coordsEnd.x = x;
    coordsEnd.y = y;
  };

  const isPassiveEventSupported = checkPassiveEventSupport(window?.document);

  const onTouchEnd = (e: TouchEvent) => {
    if (isSwiping.value) onSwipeEnd?.(e, direction.value);

    isSwiping.value = false;
  };

  const stops = [
    useEventListener(
      target,
      'touchstart',
      (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        if (
          listenerOptions === true ||
          (isObject(listenerOptions) && listenerOptions.capture && !listenerOptions.passive)
        )
          e.preventDefault();
        const [x, y] = getTouchEventCoords(e);
        updateCoordsStart(x, y);
        updateCoordsEnd(x, y);
        onSwipeStart?.(e);
      },
      listenerOptions,
    ),

    useEventListener(
      target,
      'touchmove',
      (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        const [x, y] = getTouchEventCoords(e);
        updateCoordsEnd(x, y);
        if (!isSwiping.value && isThresholdExceeded.value) isSwiping.value = true;
        if (isSwiping.value) onSwipe?.(e);
      },
      listenerOptions,
    ),

    useEventListener(target, 'touchend', onTouchEnd, listenerOptions),
    useEventListener(target, 'touchcancel', onTouchEnd, listenerOptions),
  ];

  const stop = () => stops.forEach((s) => s());

  return {
    isPassiveEventSupported,
    isSwiping,
    direction,
    coordsStart,
    coordsEnd,
    lengthX: diffX,
    lengthY: diffY,
    stop,
  };
}

/**
 * This is a polyfill for passive event support detection
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */
function checkPassiveEventSupport(document?: Document) {
  if (!document) return false;
  let supportsPassive = false;
  const optionsBlock: AddEventListenerOptions = {
    get passive() {
      supportsPassive = true;
      return false;
    },
  };
  document.addEventListener('x', noop, optionsBlock);
  document.removeEventListener('x', noop);
  return supportsPassive;
}
