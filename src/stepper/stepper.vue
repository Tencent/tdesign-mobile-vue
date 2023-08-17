<template>
  <div :class="[`${name}`, `${name}--${size}`]">
    <div
      :class="[
        `${name}__minus`,
        `${name}__minus--${theme}`,
        `${name}__icon--${size}`,
        `${disabled || Number(stepperValue) <= min ? name + '--' + theme + '-disabled' : ''}`,
      ]"
      @click="minusValue"
    >
      <remove-icon :class="`${name}__minus-icon`" />
    </div>
    <input
      v-model="stepperValue"
      :class="[
        `${name}__input`,
        `${name}__input--${theme}`,
        `${name}__input--${size}`,
        `${disabled ? name + '--' + theme + '-disabled' : ''}`,
      ]"
      type="tel"
      :style="inputStyle"
      :disabled="disableInput || disabled"
      :readonly="disableInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @change="handleChange"
    />
    <div
      :class="[
        `${name}__plus`,
        `${name}__plus--${theme}`,
        `${name}__icon--${size}`,
        `${disabled || Number(stepperValue) >= max ? name + '--' + theme + '-disabled' : ''}`,
      ]"
      @click="plusValue"
    >
      <add-icon :class="`${name}__plus-icon`" />
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, computed, defineComponent } from 'vue';
import { AddIcon, RemoveIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import StepperProps from './props';
import { useDefault } from '../shared';
import { TdStepperProps } from './type';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
const name = `${prefix}-stepper`;
export default defineComponent({
  name,
  components: {
    AddIcon,
    RemoveIcon,
  },
  props: StepperProps,
  emits: ['update:value', 'update:modelValue', 'blur', 'change', 'overlimit'],
  setup(props, context) {
    const [stepperValue] = useDefault<TdStepperProps['value'], TdStepperProps>(props, context.emit, 'value', 'change');
    const disabled = useFormDisabled();
    const { min, max, step } = toRefs(props);
    const inputStyle = computed(() => (props.inputWidth ? { width: `${props.inputWidth}px` } : ''));

    const isDisabled = (type: 'minus' | 'plus') => {
      if (disabled.value) return true;
      if (type === 'minus' && Number(stepperValue.value) <= min.value) {
        return true;
      }
      if (type === 'plus' && Number(stepperValue.value) >= max.value) {
        return true;
      }
      return false;
    };

    const getLen = (num: number) => {
      const numStr = num.toString();
      return numStr.indexOf('.') === -1 ? 0 : numStr.split('.')[1].length;
    };

    /**
     * 精确加法
     */
    const add = (a: number, b: number) => {
      const maxLen = Math.max(getLen(a), getLen(b));
      const base = 10 ** maxLen;
      return Math.round(a * base + b * base) / base;
    };

    const formatValue = (value: number) => {
      return Math.max(Math.min(max.value, value, Number.MAX_SAFE_INTEGER), min.value, Number.MIN_SAFE_INTEGER).toFixed(
        getLen(step.value),
      );
    };

    const updateValue = (value: TdStepperProps['value']) => {
      stepperValue.value = value;
    };

    const plusValue = () => {
      if (isDisabled('plus')) {
        props.onOverlimit?.('plus');
        return;
      }
      updateValue(formatValue(add(Number(stepperValue.value), step.value)));
    };

    const minusValue = () => {
      if (isDisabled('minus')) {
        props.onOverlimit?.('minus');
        return;
      }
      updateValue(formatValue(add(Number(stepperValue.value), -step.value)));
    };

    const handleInput = (e: Event) => {
      const value = (e.target as HTMLTextAreaElement).value.replace(/[^\d]/g, '');
      stepperValue.value = Number(value);
    };

    const handleChange = () => {
      const formattedValue = formatValue(Number(stepperValue.value));
      updateValue(formattedValue);
    };

    const handleFocus = () => {
      props.onFocus?.(Number(stepperValue.value));
    };

    const handleBlur = () => {
      props.onBlur?.(Number(stepperValue.value));
    };

    return {
      name,
      minusValue,
      stepperValue,
      plusValue,
      handleInput,
      handleChange,
      inputStyle,
      handleFocus,
      handleBlur,
      ...toRefs(props),
      disabled,
    };
  },
});
</script>
