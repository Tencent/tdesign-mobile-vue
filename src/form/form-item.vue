<template>
  <div :class="formItemClass">
    <div :class="[`${classPrefix}-wrap`, `${classPrefix}--${labelAlign}`]">
      <div :class="labelClasses" :style="labelStyle">
        <label :for="props.for">
          <t-node :content="labelContent"></t-node>
        </label>
      </div>
      <div :class="contentClasses" :style="contentStyle">
        <div :class="contentSlotClasses">
          <slot></slot>
        </div>
        <div v-if="helpNode" :class="[`${classPrefix}-help`, `${prefix}-form__controls--${contentAlign}`]">
          <t-node :content="helpNode"></t-node>
        </div>
        <div v-if="extraNode" :class="[`${classPrefix}-extra`, `${prefix}-form__controls--${contentAlign}`]">
          {{ extraNode }}
        </div>
      </div>
    </div>
    <t-node v-if="arrow" :content="rightIconContent" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  getCurrentInstance,
  h,
} from 'vue';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isBoolean from 'lodash/isBoolean';
import cloneDeep from 'lodash/cloneDeep';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import isNil from 'lodash/isNil';
import lodashTemplate from 'lodash/template';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import { renderTNode, TNode } from '../shared';
import { validate } from './form-model';

import {
  AllValidateResult,
  Data,
  FormErrorMessage,
  FormItemValidateMessage,
  FormRule,
  ValidateTriggerType,
  ValueType,
} from './type';
import props from './form-item-props';
import {
  AnalysisValidateResult,
  ErrorListType,
  FormInjectionKey,
  FormItemContext,
  FormItemInjectionKey,
  SuccessListType,
  ValidateStatus,
} from './const';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-form-item`;
const classPrefix = `${prefix}-form__item`;

export type FormItemValidateResult<T extends Data = Data> = { [key in keyof T]: boolean | AllValidateResult[] };

export default defineComponent({
  name,
  components: { TNode },
  props,
  setup(props, { slots }) {
    const { name } = toRefs(props);

    const internalInstance = getCurrentInstance();

    const form = inject(FormInjectionKey, undefined);

    const rightIconContent = computed(() => {
      return h(ChevronRightIcon, { size: '24px', color: 'rgba(0, 0, 0, .4)' });
    });

    const helpNode = computed(() => renderTNode(internalInstance, 'help'));

    const extraNode = computed(() => {
      const list = errorList.value;
      if (showErrorMessage.value && list[0]?.message) {
        return list[0]?.message;
      }
      if (successList.value.length) {
        return successList.value[0].message;
      }
      return null;
    });

    const formItemClass = computed(() => [
      `${prefix}-form__item`,
      `${prefix}-form__item--bordered`,
      `${prefix}-form--${labelAlign.value}`,
      `${prefix}-form-item__${props.name}`,
      {
        [`${prefix}-form__item-with-help`]: helpNode.value,
      },
    ]);

    const needRequiredMark = computed(() => {
      const requiredMark = props.requiredMark ?? form?.requiredMark;
      const isRequired = innerRules.value.filter((rule) => rule.required).length > 0;
      return requiredMark ?? isRequired;
    });

    const hasLabel = computed(() => slots.label || props.label);
    const hasColon = computed(() => !!(form?.colon && hasLabel.value));
    const FROM_LABEL = `${prefix}-form__label`;
    const labelAlign = computed(() => (isNil(props.labelAlign) ? form?.labelAlign : props.labelAlign));
    const labelWidth = computed(() => (isNil(props.labelWidth) ? form?.labelWidth : props.labelWidth));
    const contentAlign = computed(() => (isNil(props.contentAlign) ? form?.contentAlign : props.contentAlign));

    const labelClasses = computed(() => [
      `${prefix}-form__label`,
      {
        [`${FROM_LABEL}--required`]: needRequiredMark.value,
        [`${FROM_LABEL}--colon`]: hasColon.value,
        [`${FROM_LABEL}--top`]: hasLabel.value && (labelAlign.value === 'top' || !labelWidth.value),
        [`${FROM_LABEL}--left`]: labelAlign.value === 'left' && labelWidth.value,
        [`${FROM_LABEL}--right`]: labelAlign.value === 'right' && labelWidth.value,
      },
    ]);

    const labelStyle = computed(() => {
      if (labelWidth.value && labelAlign.value !== 'top') {
        return isNumber(labelWidth.value) ? { width: `${labelWidth.value}px` } : { width: labelWidth.value };
      }
      return {};
    });

    const labelContent = computed(() => {
      if (Number(labelWidth.value) === 0) return;
      return renderTNode(internalInstance, 'label');
    });

    const freeShowErrorMessage = ref<boolean | undefined>(false);
    const showErrorMessage = computed(() => {
      if (isBoolean(freeShowErrorMessage.value)) return freeShowErrorMessage.value;
      if (isBoolean(props.showErrorMessage)) return props.showErrorMessage;
      return form?.showErrorMessage;
    });

    const errorClasses = computed(() => {
      if (!showErrorMessage.value) return '';
      if (!errorList.value.length) return;
      const type = errorList.value[0].type || 'error';
      return type === 'error' ? `${classPrefix}--error` : `${classPrefix}--warning`;
    });

    const contentClasses = computed(() => [`${prefix}-form__controls`, errorClasses.value]);
    const contentSlotClasses = computed(() => [
      `${prefix}-form__controls-content`,
      `${prefix}-form__controls--${contentAlign.value}`,
    ]);

    const contentStyle = computed(() => {
      let contentStyle = {};
      if (labelWidth.value && labelAlign.value !== 'top') {
        if (isNumber(labelWidth.value)) {
          contentStyle = { marginLeft: `${labelWidth.value}px` };
        } else {
          contentStyle = { marginLeft: labelWidth.value };
        }
      }

      return contentStyle;
    });

    const errorList = ref<ErrorListType[]>([]);
    const successList = ref<SuccessListType[]>([]);
    const verifyStatus = ref(ValidateStatus.TO_BE_VALIDATED);
    const resetValidating = ref(false);
    const needResetField = ref(false);

    const resetHandler = () => {
      needResetField.value = false;
      errorList.value = [];
      successList.value = [];
      verifyStatus.value = ValidateStatus.TO_BE_VALIDATED;
    };
    const getEmptyValue = (): ValueType => {
      const type = Object.prototype.toString.call(lodashGet(form?.data, `${props.name}`));
      let emptyValue: ValueType;
      if (type === '[object String]') {
        emptyValue = '';
      }
      if (type === '[object Array]') {
        emptyValue = [];
      }
      if (type === '[object Object]') {
        emptyValue = {};
      }
      return emptyValue;
    };
    const resetField = async (resetType: 'initial' | 'empty' | undefined = form?.resetType) => {
      if (!props.name) return null;

      if (resetType === 'empty') {
        // @ts-ignore
        lodashSet(form?.data, props.name, getEmptyValue());
      } else if (resetType === 'initial') {
        // @ts-ignore
        lodashSet(form?.data, props.name, initialValue.value);
      }

      await nextTick();
      if (resetValidating.value) {
        needResetField.value = true;
      } else {
        resetHandler();
      }
    };

    const errorMessages = computed<FormErrorMessage>(() => form?.errorMessage || {});
    const innerRules = computed<FormRule[]>(() => {
      if (props.rules?.length) return props.rules;
      if (!props.name) return [];
      const index = `${props.name}`.lastIndexOf('.') || -1;
      const pRuleName = `${props.name}`.slice(index + 1);
      return lodashGet(form?.rules, props.name) || lodashGet(form?.rules, pRuleName) || [];
    });

    const analysisValidateResult = async (trigger: ValidateTriggerType): Promise<AnalysisValidateResult> => {
      const result: AnalysisValidateResult = {
        successList: [],
        errorList: [],
        rules: [],
        resultList: [],
        allowSetValue: false,
      };
      result.rules =
        trigger === 'all'
          ? innerRules.value
          : innerRules.value.filter((item) => (item.trigger || 'change') === trigger);
      if (innerRules.value.length && !result.rules?.length) {
        return result;
      }
      result.allowSetValue = true;
      result.resultList = await validate(value.value, result.rules);
      result.errorList = result.resultList
        .filter((item) => item.result !== true)
        .map((item) => {
          Object.keys(item).forEach((key) => {
            if (!item.message && errorMessages.value[key]) {
              const compiled = lodashTemplate(errorMessages.value[key]);
              const name = isString(props.label) ? props.label : props.name;
              item.message = compiled({
                name,
                validate: item[key],
              });
            }
          });
          return item as ErrorListType;
        });
      // 仅有自定义校验方法才会存在 successList
      result.successList = result.resultList.filter(
        (item) => item.result === true && item.message && item.type === 'success',
      ) as SuccessListType[];
      return result;
    };
    const validateHandler = async <T extends Data = Data>(
      trigger: ValidateTriggerType,
      showErrorMessage?: boolean,
    ): Promise<FormItemValidateResult<T>> => {
      resetValidating.value = true;
      // undefined | boolean
      freeShowErrorMessage.value = showErrorMessage;
      const {
        successList: innerSuccessList,
        errorList: innerErrorList,
        rules,
        resultList,
        allowSetValue,
      } = await analysisValidateResult(trigger);

      if (allowSetValue) {
        successList.value = innerSuccessList || [];
        errorList.value = innerErrorList || [];
      }
      // 根据校验结果设置校验状态
      if (rules.length) {
        verifyStatus.value = innerErrorList?.length ? ValidateStatus.FAIL : ValidateStatus.SUCCESS;
      }
      // 重置处理
      if (needResetField.value) {
        resetHandler();
      }
      resetValidating.value = false;

      return {
        [`${name.value}`]: innerErrorList?.length === 0 ? true : resultList,
      } as FormItemValidateResult<T>;
    };

    const setValidateMessage = (validateMessage: FormItemValidateMessage[]) => {
      if (!validateMessage && !isArray(validateMessage)) return;
      if (validateMessage.length === 0) {
        errorList.value = [];
        verifyStatus.value = ValidateStatus.SUCCESS;
      }
      errorList.value = validateMessage.map((item) => ({ ...item, result: false }));
      verifyStatus.value = ValidateStatus.FAIL;
    };

    const value = computed<ValueType>(() => form?.data && lodashGet(form?.data, `${name.value}`));
    const initialValue = ref<ValueType>(undefined);

    const context: FormItemContext = reactive({
      name,
      resetHandler,
      resetField,
      validate: validateHandler,
      setValidateMessage,
    });

    onMounted(() => {
      initialValue.value = cloneDeep(value.value);
      form?.children.push(context);
    });

    onBeforeUnmount(() => {
      if (form) form.children = form?.children.filter((ctx) => ctx !== context);
    });

    watch(
      value,
      async () => {
        await validateHandler('change');
      },
      { deep: true },
    );

    watch(
      () => [props.name, JSON.stringify(props.rules)].join(','),
      () => {
        validateHandler('change');
      },
    );

    return {
      props,
      prefix,
      classPrefix,
      labelAlign,
      formItemClass,
      helpNode,
      extraNode,
      contentClasses,
      contentSlotClasses,
      contentStyle,
      labelClasses,
      labelStyle,
      labelContent,
      rightIconContent,
    };
  },
});
</script>
