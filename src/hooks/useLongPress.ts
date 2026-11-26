import { getCurrentInstance, onUnmounted, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue';

export type LongPressEvent = PointerEvent | TouchEvent;

export interface UseLongPressOptions {
  /**
   * 触发长按的时长阈值（ms）
   * @default 350
   */
  duration?: number;
  /**
   * 移动容差（px），按下后位移超过该值视为滑动/滚动，取消本次长按
   * @default 10
   */
  moveThreshold?: number;
  /** 是否禁用，支持布尔值 / ref / getter */
  disabled?: MaybeRefOrGetter<boolean>;
  /**
   * 是否阻止触发系统右键菜单（contextmenu）
   * @default false
   */
  preventContextMenu?: boolean;
  /** 达到长按阈值时触发，入参为触发长按的按下事件 */
  onLongPress?: (e: LongPressEvent) => void;
  /** 按压结束（抬起/取消）或移动取消时触发 */
  onPressEnd?: (e: LongPressEvent) => void;
}

export interface UseLongPressReturn {
  /** 当前是否处于长按态（按住超过阈值） */
  isLongPressed: Ref<boolean>;
  /** 当前是否处于按下态（已按下，但未必达到长按阈值） */
  isPressing: Ref<boolean>;
  /** 可展开绑定到目标元素上的事件处理器（优先 pointer 事件，否则回退 touch 事件） */
  handlers: LongPressHandlers;
  /** 主动停止：清理定时器并重置状态，供非组件场景（如指令 unmounted）手动解绑 */
  stop: () => void;
}

/** 可绑定到目标元素上的事件处理器集合 */
export type LongPressHandlers = Record<string, (e: any) => void>;

interface PressPoint {
  x: number;
  y: number;
}

/** 从 pointer / touch 事件中提取视口坐标 */
function getEventPoint(e: LongPressEvent): PressPoint | null {
  if ('touches' in e) {
    const touch = e.touches[0] ?? e.changedTouches[0];
    return touch ? { x: touch.clientX, y: touch.clientY } : null;
  }
  return { x: e.clientX, y: e.clientY };
}

/**
 * 长按手势：按住超过阈值才进入长按态（isLongPressed = true），短按不触发，松开 / 超出移动容差 / 取消时退出。
 *
 * @example
 * const { isLongPressed, handlers } = useLongPress({ onLongPress: () => showMenu() });
 * // JSX: <div class={{ 'is-active': isLongPressed.value }} {...handlers} />
 */
export function useLongPress(options: UseLongPressOptions = {}): UseLongPressReturn {
  const { duration = 350, moveThreshold = 10, disabled, preventContextMenu = false, onLongPress, onPressEnd } = options;

  const isLongPressed = ref(false);
  const isPressing = ref(false);

  let longPressTimer: ReturnType<typeof setTimeout> | null = null;
  let pressStartPoint: PressPoint | null = null;

  const isDisabled = () => (disabled == null ? false : toValue(disabled));

  const clearLongPressTimer = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  };

  const resetPress = (e: LongPressEvent) => {
    clearLongPressTimer();
    pressStartPoint = null;
    const wasPressing = isPressing.value || isLongPressed.value;
    isPressing.value = false;
    if (isLongPressed.value) {
      isLongPressed.value = false;
    }
    if (wasPressing) {
      onPressEnd?.(e);
    }
  };

  const handlePressStart = (e: LongPressEvent) => {
    if (isDisabled()) {
      return;
    }
    // 仅响应主按键：鼠标忽略右键/中键，触摸与触控笔正常
    if ('button' in e && e.pointerType === 'mouse' && e.button !== 0) {
      return;
    }
    clearLongPressTimer();
    pressStartPoint = getEventPoint(e);
    isPressing.value = true;
    longPressTimer = setTimeout(() => {
      isLongPressed.value = true;
      onLongPress?.(e);
    }, duration);
  };

  const handlePressMove = (e: LongPressEvent) => {
    if (!pressStartPoint) {
      return;
    }
    const point = getEventPoint(e);
    if (!point) {
      return;
    }
    if (Math.hypot(point.x - pressStartPoint.x, point.y - pressStartPoint.y) > moveThreshold) {
      resetPress(e);
    }
  };

  const handlePressEnd = (e: LongPressEvent) => {
    if (!isPressing.value && !isLongPressed.value) {
      return;
    }
    resetPress(e);
  };

  const handleContextMenu = (e: Event) => {
    if (preventContextMenu && !isDisabled()) {
      e.preventDefault();
    }
  };

  const stop = () => {
    clearLongPressTimer();
    pressStartPoint = null;
    isPressing.value = false;
    isLongPressed.value = false;
  };

  if (getCurrentInstance()) {
    onUnmounted(stop);
  }

  const supportsPointerEvent = typeof window !== 'undefined' && 'PointerEvent' in window;

  const handlers: LongPressHandlers = supportsPointerEvent
    ? {
        onPointerdown: handlePressStart,
        onPointermove: handlePressMove,
        onPointerup: handlePressEnd,
        onPointercancel: resetPress,
        onPointerleave: resetPress,
        onContextmenu: handleContextMenu,
      }
    : {
        onTouchstart: handlePressStart,
        onTouchmove: handlePressMove,
        onTouchend: handlePressEnd,
        onTouchcancel: resetPress,
        onContextmenu: handleContextMenu,
      };

  return {
    isLongPressed,
    isPressing,
    handlers,
    stop,
  };
}

export default useLongPress;
