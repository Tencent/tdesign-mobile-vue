import { Ref, inject, computed, getCurrentInstance } from 'vue';
import isBoolean from 'lodash/isBoolean';
import { TdFormProps } from './type';

export interface FormDisabledProvider {
  disabled: Ref<TdFormProps['disabled']>;
}

/**
 * 用于实现 form 的全局禁用状态hook
 * 禁用优先级: 组件 > 组件组 > 表单(checkbox.disabled > checkboxGroup.disabled > form.disabled)
 * @returns
 */
export function useFormDisabled(extend?: Ref<boolean>) {
  const ctx = getCurrentInstance();
  const propsDisabled = computed(() => ctx?.props.disabled as boolean);
  const { disabled } = inject<FormDisabledProvider>('formDisabled', Object.create(null));
  return computed(() => {
    // 组件
    if (isBoolean(propsDisabled.value)) {
      return propsDisabled.value;
    }
    // 组件组
    if (isBoolean(extend?.value)) {
      return propsDisabled.value;
    }
    // 表单
    if (isBoolean(disabled?.value)) {
      return disabled?.value;
    }
    return false;
  });
}
