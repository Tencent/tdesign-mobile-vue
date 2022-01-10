import { computed, ref, SetupContext, watchEffect } from 'vue';
import { toCamel } from '../util';

// 基于Key键的受控和非受控逻辑
export function useDefault<T, K extends keyof T, C extends SetupContext>(
  props: T,
  context: C,
  key: K,
  eventName: Parameters<C['emit']>[0],
  ...arg: any[]
) {
  const defaultModelValue = `modelValue`;
  const defaultName = `default${toCamel(String(key))}`;
  const isUsedModelValue = props[defaultModelValue] !== undefined;
  const innerValue = ref(props[key] || props[defaultModelValue] || props[defaultName]);

  const toCamelCase = (str: string) =>
    `on${str
      .split('-')
      .map((char) => toCamel(char))
      .join('')}`;

  const emitEvents = (value: any) => {
    console.log('trigger emitEvents', value, 'isUsedModelValue', isUsedModelValue);
    // 接口层都是以value为主的v-model
    const updateKeys = [`update:${key}`];
    if (isUsedModelValue) {
      // 支持vue3的绑定
      updateKeys.push(`update:modelValue`, value, ...arg);
    }
    updateKeys.forEach((updateKey) => {
      // 触发v-model相关事件
      context.emit(updateKey, value, ...arg);
    });
    // onXXXX
    if (typeof props[toCamelCase(eventName)] === 'function') {
      props[toCamelCase(eventName)](value);
    }
  };

  watchEffect(() => {
    if (isUsedModelValue) {
      innerValue.value = props[defaultModelValue];
    }
    if (props[key] !== undefined) {
      innerValue.value = props[key];
    }
  });

  return computed<T[K]>({
    get() {
      return innerValue.value;
    },
    set(value) {
      if (!(props[key] !== undefined || isUsedModelValue)) {
        innerValue.value = value;
      }
      emitEvents(value);
    },
  });
}
