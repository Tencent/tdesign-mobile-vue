import { Ref, inject, computed, getCurrentInstance } from 'vue';
import { isBoolean } from 'lodash-es';
import { TdFormProps } from './type';

export interface FormDisabledProvider {
  disabled: Ref<TdFormProps['disabled']>;
}

/**
 * 用于实现 form 的全局禁用状态hook
 * 禁用优先级: 组件 > 组件组 > 表单(propsDisabled.value > extend?.value > disabled?.value)
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
      return extend.value;
    }
    // 表单
    if (isBoolean(disabled?.value)) {
      return disabled.value;
    }
    return false;
  });
}

export interface FormReadonlyProvider {
  readonly: Ref<TdFormProps['readonly']>;
}

/**
 * 用于实现 form 的全局只读状态hook
 * 只读优先级: 组件 > 组件组 > 表单(propsReadonly.value > extend?.value > readonly?.value)
 * @returns
 */
export function useFormReadonly(extend?: Ref<boolean>) {
  const ctx = getCurrentInstance();
  const propsReadonly = computed(() => ctx?.props.readonly as boolean);
  const { readonly } = inject<FormReadonlyProvider>('formReadonly', Object.create(null));
  return computed(() => {
    // 组件
    if (isBoolean(propsReadonly.value)) {
      return propsReadonly.value;
    }
    // 组件组
    if (isBoolean(extend?.value)) {
      return extend.value;
    }
    // 表单
    if (isBoolean(readonly?.value)) {
      return readonly.value;
    }
    return false;
  });
}
