<template>
  <form ref="formRef" :class="formClass" :onSubmit="(e) => onSubmit(e)" :onReset="(e) => onReset(e)">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive, ref, toRefs } from 'vue';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import {
  Data,
  FormResetParams,
  FormValidateMessage,
  FormValidateParams,
  FormValidateResult,
  TdFormProps,
} from './type';
import props from './props';
import { FormInjectionKey, FormItemContext } from './const';
import { FormDisabledProvider } from './hooks';
import config from '../config';
import { renderContent } from '../shared';
import { FormItemValidateResult } from './form-item.vue';

const { prefix } = config;
const name = `${prefix}-form`;

type FormResetEvent = Event;
// export type FormSubmitEvent = SubmitEvent; (for higher typescript version)
type FormSubmitEvent = Event;
type Result = FormValidateResult<TdFormProps['data']>;

export const requestSubmit = (target: HTMLFormElement) => {
  if (!(target instanceof HTMLFormElement)) {
    throw new Error('target must be HTMLFormElement');
  }
  const submitter = document.createElement('input');
  submitter.type = 'submit';
  submitter.hidden = true;
  target.appendChild(submitter);
  submitter.click();
  target.removeChild(submitter);
};

export default defineComponent({
  name,
  props,
  setup(props, { expose }) {
    const {
      disabled,
      showErrorMessage,
      labelWidth,
      labelAlign,
      contentAlign,
      data,
      colon,
      requiredMark,
      rules,
      errorMessage,
      resetType,
    } = toRefs(props);

    // @ts-ignore
    const formRef = ref<HTMLFormElement>(null);
    const children = ref<FormItemContext[]>([]);

    provide<FormDisabledProvider>('formDisabled', {
      disabled,
    });

    provide(
      FormInjectionKey,
      reactive({
        showErrorMessage,
        labelWidth,
        labelAlign,
        contentAlign,
        data,
        colon,
        requiredMark,
        rules,
        errorMessage,
        resetType,
        children,
        renderContent,
      }),
    );

    const formClass = computed(() => [name]);

    const needValidate = (name: string | number, fields: string[] | undefined) => {
      if (!fields || !isArray(fields)) return true;
      return fields.indexOf(`${name}`) !== -1;
    };
    const formatValidateResult = <T extends Data>(validateResultList: FormItemValidateResult<T>[]) => {
      const result = validateResultList.reduce((r, err) => Object.assign(r || {}, err), {});
      Object.keys(result).forEach((key) => {
        if (result[key] === true) {
          delete result[key];
        }
      });
      return isEmpty(result) ? true : result;
    };
    const validate = async (param?: FormValidateParams): Promise<Result> => {
      const { fields, trigger = 'all', showErrorMessage } = param || {};
      const list = children.value
        .filter((child) => isFunction(child.validate) && needValidate(String(child.name), fields))
        .map((child) => child.validate(trigger, showErrorMessage));
      const arr = await Promise.all(list);
      const result = formatValidateResult(arr);
      props.onValidate?.({
        validateResult: result,
      });
      return result;
    };

    const submitParams = ref<Pick<FormValidateParams, 'showErrorMessage'>>();
    const onSubmit = (e?: FormSubmitEvent) => {
      if (props.preventSubmitDefault && e) {
        e.preventDefault();
        e.stopPropagation();
      }
      validate(submitParams.value).then((r) => {
        // @ts-ignore
        props.onSubmit?.({ validateResult: r });
      });
      submitParams.value = undefined;
    };

    const submit = async (params?: Pick<FormValidateParams, 'showErrorMessage'>) => {
      submitParams.value = params;
      requestSubmit(formRef.value);
    };

    const resetParams = ref<FormResetParams<Data>>();
    const onReset = (e?: FormResetEvent) => {
      if (props.preventSubmitDefault && e) {
        e.preventDefault();
        e.stopPropagation();
      }
      children.value
        .filter(
          (child) =>
            isFunction(child.resetField) && needValidate(String(child.name), resetParams.value?.fields as string[]),
        )
        .forEach((child) => child.resetField(resetParams.value?.type));
      resetParams.value = undefined;
      props.onReset?.({ e });
    };

    const reset = <FormData extends Data>(params?: FormResetParams<FormData>) => {
      (resetParams.value as any) = params;
      formRef.value.reset();
    };

    const clearValidate = (fields?: Array<string>) => {
      children.value.forEach((child) => {
        if (isFunction(child.resetHandler) && needValidate(String(child.name), fields)) {
          child.resetHandler();
        }
      });
    };
    const setValidateMessage = (validateMessage: FormValidateMessage<FormData>) => {
      const keys = Object.keys(validateMessage);
      if (!keys.length) return;
      const list = children.value
        .filter((child) => isFunction(child.setValidateMessage) && keys.includes(`${child.name}`))
        .map((child) => child.setValidateMessage(validateMessage[`${child.name}`]));
      Promise.all(list);
    };

    expose({ validate, submit, reset, clearValidate, setValidateMessage });

    return {
      formClass,
      onSubmit,
      onReset,
    };
  },
});
</script>
