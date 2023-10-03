import { ref, Ref, getCurrentInstance, ComponentInternalInstance } from 'vue';
import kebabCase from 'lodash/kebabCase';

export type ChangeHandler<T> = (value: T, ...args: any[]) => void;

export function useVModel<T>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange?: (...args: any) => any,
  propName = 'value',
  // emit 和 eventName 用于支持 v-model 和 xxx.sync 语法糖
): [Ref<T>, ChangeHandler<T>] {
  const { emit, vnode } = getCurrentInstance() as ComponentInternalInstance;
  const internalValue = ref<T>() as Ref<T>;
  internalValue.value = defaultValue;
  const vProps = vnode.props || {};
  const isVM =
    Object.prototype.hasOwnProperty.call(vProps, 'modelValue') ||
    Object.prototype.hasOwnProperty.call(vProps, 'model-value');
  const isVMP =
    Object.prototype.hasOwnProperty.call(vProps, propName) ||
    Object.prototype.hasOwnProperty.call(vProps, kebabCase(propName));
  // 受控模式 v-model:propName
  if (isVMP || typeof value.value !== 'undefined') {
    return [
      value,
      (newValue, ...args) => {
        emit?.(`update:${propName}`, newValue, ...args);
        onChange?.(newValue, ...args);
      },
    ];
  }

  // 受控模式:modelValue v-model
  if (isVM || typeof modelValue.value !== 'undefined') {
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
