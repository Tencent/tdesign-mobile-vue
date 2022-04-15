import { ref, Ref, getCurrentInstance, ComponentInternalInstance } from 'vue';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

// 用于实现 v-model
export function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  // emit 和 eventName 用于支持 v-model
): [Ref<T>, ChangeHandler<T, P>] {
  const { emit } = getCurrentInstance() as ComponentInternalInstance;
  const internalValue = ref();
  internalValue.value = defaultValue;

  // 受控模式
  if (typeof value.value !== 'undefined') {
    return [value, onChange || (() => {})];
  }

  // 受控模式:modelValue
  if (typeof modelValue.value !== 'undefined') {
    return [
      modelValue,
      (newValue, ...args) => {
        emit?.(`update:modelValue`, newValue, ...args);
        onChange?.(newValue, ...args);
      },
    ];
  }

  // 非受控模式
  return [
    internalValue as Ref<T>,
    (newValue, ...args) => {
      internalValue.value = newValue;
      onChange?.(newValue, ...args);
    },
  ];
}
