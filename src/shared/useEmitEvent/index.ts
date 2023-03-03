import camelCase from 'lodash/camelCase';

export type EmitEventName = { event: string; method: string } | string;

/**
 * 组件对外传递事件
 * @param props 组件props
 * @param emit 事件名(注意使用中划线)
 * @param args 事件参数
 * @returns {emitEvent}
 * @example useEmitEvent<IProps>(props, emit);
 */
export function useEmitEvent<P extends Record<string, any>>(props: P, emit: (...args: any[]) => void) {
  return function emitEvent<T extends any[] = any[]>(eventName: string, ...args: T) {
    let emitEventMethodName = '';
    if (typeof eventName === 'string') {
      emitEventMethodName = camelCase(`on-${eventName}`);
    }

    if (typeof props[emitEventMethodName] === 'function') {
      props[emitEventMethodName](...args);
    } else {
      emit(eventName, ...args);
    }
  };
}
