import { computed, ref, SetupContext, watchEffect } from 'vue';
import { toCamel } from '../util';

export function useDefault<T, K extends keyof T, C extends SetupContext>(
  props: T,
  context: C,
  key: K,
  eventName: Parameters<C['emit']>[0],
) {
  const modelValue = `modelValue`;
  const defaultName = `default${toCamel(String(key))}`;

  // XXX: warning or error when value is undefined
  const isUsedModelValue = props[modelValue] !== undefined;
  const isUsedKey = props[key] !== undefined;

  const innerValue = ref();
  // XXX: 绑定值为undefined如何解， 要么就明确避免

  if (isUsedKey) {
    innerValue.value = props[key];
  } else if (isUsedModelValue) {
    innerValue.value = props[modelValue];
  } else {
    innerValue.value = props[defaultName];
  }

  const toCamelCase = (str: string) =>
    `on${str
      .split('-')
      .map((char) => toCamel(char))
      .join('')}`;

  const emitEvents = (value: T[K], ...arg: any[]) => {
    console.log('trigger emitEvents', value, 'isUsedModelValue', isUsedModelValue);
    const updateKeys = [`update:${key}`];
    if (isUsedModelValue) {
      updateKeys.push(`update:modelValue`);
    }
    updateKeys.forEach((updateKey) => {
      context.emit(updateKey, value, ...arg);
    });
    if (typeof props[toCamelCase(eventName)] === 'function') {
      props[toCamelCase(eventName)](value, ...arg);
    }
  };

  watchEffect(() => {
    if (isUsedModelValue) {
      innerValue.value = props[modelValue];
    }
    if (isUsedKey) {
      innerValue.value = props[key];
    }
  });

  const setInnerValue = (value: T[K], ...arg: any[]) => {
    if (!isUsedKey && !isUsedModelValue) {
      innerValue.value = value;
    }
    emitEvents(value, arg);
  };

  return {
    innerValue: computed<T[K]>({
      get() {
        return innerValue.value;
      },
      set(value) {
        if (!isUsedKey && !isUsedModelValue) {
          innerValue.value = value;
        }
        emitEvents(value);
      },
    }),
    setInnerValue,
  };
}
