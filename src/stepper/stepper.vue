<template>
  <div :class="[`${name}`, `${disabled ? disabledClass : ''}`, `${isPureMode ? `${name}__pure` : ''}`]">
    <div :class="[`${name}__minus`, `${disabled || stepperValue <= min ? 't-is-disabled' : ''}`]" @click="minusValue">
      <remove-icon :class="`${name}__icon`" />
    </div>
    <input
      v-model="stepperValue"
      :class="`${name}__input`"
      type="tel"
      :style="inputStyle"
      :disabled="disableInput || disabled"
      :readonly="disableInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @change="handleChange"
    />
    <div :class="[`${name}__plus`, `${disabled || stepperValue >= max ? 't-is-disabled' : ''}`]" @click="plusValue">
      <add-icon :class="`${name}__icon`" />
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, computed, defineComponent, SetupContext, nextTick } from 'vue';
import { AddIcon, RemoveIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import StepperProps from './props';
import CLASSNAMES from '../shared/constants';
import { useDefault, useEmitEvent } from '../shared';
import { TdStepperProps } from './type';

const { prefix } = config;
const name = `${prefix}-stepper`;
const disabledClass = CLASSNAMES.STATUS.disabled;
export default defineComponent({
  name,
  components: {
    AddIcon,
    RemoveIcon,
  },
  props: StepperProps,
  emits: ['update:value', 'update:modelValue', 'blur', 'change', 'overlimit'],
  setup(props, context: SetupContext) {
    const [stepperValue] = useDefault<number, TdStepperProps>(props, context.emit, 'value', 'change');
    const emitEvent = useEmitEvent(props, context.emit);

    const { min, max, step, inputWidth, theme, disabled } = toRefs(props);
    const isPureMode = computed(() => theme.value === 'grey');
    const inputStyle = computed(() => (inputWidth ? { width: `${inputWidth.value}px` } : ''));

    const isDisabled = (type: 'minus' | 'plus') => {
      if (disabled.value) return true;
      if (type === 'minus' && stepperValue.value <= min.value) {
        return true;
      }
      if (type === 'plus' && stepperValue.value >= max.value) {
        return true;
      }
      return false;
    };

    const formatValue = (value: number) =>
      Math.max(Math.min(max.value, value, Number.MAX_SAFE_INTEGER), min.value, Number.MIN_SAFE_INTEGER);

    const updateValue = (value: number) => {
      stepperValue.value = formatValue(value);
    };

    const plusValue = () => {
      if (isDisabled('plus')) {
        emitEvent('overlimit', 'plus');
        return;
      }
      updateValue(Number(stepperValue.value) + step.value);
    };

    const minusValue = () => {
      if (isDisabled('minus')) {
        emitEvent('overlimit', 'minus');
        return;
      }
      updateValue(Number(stepperValue.value) - step.value);
    };

    const handleInput = (e: Event) => {
      const value = (e.target as HTMLTextAreaElement).value.replace(/[^\d]/g, '');
      stepperValue.value = Number(value);
    };

    const handleChange = () => {
      const formattedValue = formatValue(stepperValue.value);
      updateValue(formattedValue);
    };

    const handleFocus = () => {
      emitEvent('focus', stepperValue.value);
    };

    const handleBlur = () => {
      emitEvent('blur', stepperValue.value);
    };

    return {
      name,
      disabledClass,
      minusValue,
      stepperValue,
      plusValue,
      handleInput,
      handleChange,
      inputStyle,
      handleFocus,
      handleBlur,
      isPureMode,
      ...toRefs(props),
    };
  },
});
</script>
