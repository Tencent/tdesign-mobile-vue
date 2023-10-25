import { ref, onUnmounted, watch, reactive } from 'vue';
import {
  createGesture,
  dragAction,
  pinchAction,
  FullGestureState,
  WebKitGestureEvent,
  UserGestureConfig,
} from '@use-gesture/vanilla';

export type PinchState = Omit<FullGestureState<'pinch'>, 'event'> & {
  event: PointerEvent | TouchEvent | WheelEvent | WebKitGestureEvent;
};

export type DragState = Omit<FullGestureState<'drag'>, 'event'> & {
  event: PointerEvent | TouchEvent | WheelEvent | WebKitGestureEvent;
};

const Gesture = createGesture([dragAction, pinchAction]);

export type GestureHandler = {
  onDrag?: (state: DragState) => void;
  onDragStart?: (state: DragState) => void;
  onDragEnd?: (state: DragState) => void;
  onPinch?: (state: PinchState) => void;
  onPinchStart?: (state: PinchState) => void;
  onPinchEnd?: (state: PinchState) => void;
};

export type UseGestureConfig = {
  destroyInvisible?: boolean;
  visible?: boolean;
};

type UseGrestureReturn = {
  gesture: ReturnType<typeof Gesture> | null;
  destroy: () => void;
  create: (target: Element, handler: GestureHandler, config?: UserGestureConfig) => void;
};

/**
 * 手势处理
 * @param config 手势处理配置项
 * @param config.destroyInvisible 是否不可见时销毁
 * @param config.visible 可见性
 * @example
 * const visible = ref(false);
 * const gesture = useGesture({ destroyInvisible: true, visible: visible.value });
 * const handler = {
 *   onDrag: (state) => {}
 * }
 * const config = {
 *   drag: dragOptions
 * }
 * gesture.create(element, handler, config);
 * gesture.destroy();
 */

export function useGesture(config: UseGestureConfig): UseGrestureReturn {
  const gesture = ref(null);

  const destroy = () => gesture.value?.destroy?.();

  watch(
    () => [config?.destroyInvisible, config?.visible],
    ([destroyInvisible, visible]) => {
      if (destroyInvisible && !visible) {
        destroy();
      }
    },
  );

  onUnmounted(() => {
    gesture.value?.destroy?.();
  });

  const create = (target: Element, handler: GestureHandler, config: UserGestureConfig = {}) => {
    // @ts-ignore
    gesture.value = new Gesture(target, handler, config);
    returns.gesture = gesture.value;
  };

  const returns: UseGrestureReturn = reactive({
    gesture: gesture.value,
    destroy,
    create,
  });
  return returns;
}
