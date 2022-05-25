import { ref, Ref, getCurrentInstance, ComponentInternalInstance } from 'vue';

export type ChangeHandler = (value: any, ...args: any[]) => void;

export function useVModel<T>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange?: ChangeHandler,
  propName = 'value',
  // emit 和 eventName 用于支持 v-model 和 xxx.sync 语法糖
): [Ref<T>, ChangeHandler] {
  const { emit } = getCurrentInstance() as ComponentInternalInstance;
  const internalValue = ref<T>() as Ref<T>;
  internalValue.value = defaultValue;

  // 受控模式 v-model:propName
  if (typeof value.value !== 'undefined') {
    return [
      value,
      (newValue, ...args) => {
        emit?.(`update:${propName}`, newValue, ...args);
        onChange?.(newValue, ...args);
      },
    ];
  }

  // 受控模式:modelValue v-model
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
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue;
      onChange?.(newValue, ...args);
    },
  ];
}

// emits name
export const UPDATE_MODEL = 'update:modelValue';
export const UPDATE_VALUE = 'update:value';
