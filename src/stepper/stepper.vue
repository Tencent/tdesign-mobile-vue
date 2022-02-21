<template>
  <div :class="[`${name}`, `${disabled ? disabledClass : ''}`, `${isPureMode ? `${name}__pure` : ''}`]">
    <span
      :class="[`${name}__minus`, `${disabled || stepperValue <= min ? 't-is-disabled' : ''}`]"
      @click="minusValue"
    ></span>
    <input
      v-model="stepperValue"
      :class="`${name}__input`"
      type="tel"
      :style="inputStyle"
      pattern="[0-9]*"
      :disabled="disableInput || disabled"
      :readonly="disableInput"
      @blur="onBlur"
    />
    <span
      :class="[`${name}__plus`, `${disabled || stepperValue >= max ? 't-is-disabled' : ''}`]"
      @click="plusValue"
    ></span>
  </div>
</template>

<script lang="ts">
import { toRefs, computed, reactive, defineComponent, SetupContext } from 'vue';
import config from '../config';
import StepperProps from './props';
import CLASSNAMES from '../shared/constants';
import { emitEvent, useDefault } from '../shared';
import { TdStepperProps } from './type';

const { prefix } = config;
const name = `${prefix}-stepper`;
const disabledClass = CLASSNAMES.STATUS.disabled;
export default defineComponent({
  name,
  props: StepperProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props, context: SetupContext) {
    const [stepperValue] = useDefault<number, TdStepperProps>(props, context.emit, 'value', 'change');

    const { min, max, inputWidth, theme } = toRefs(props);
    const isPureMode = theme.value === 'grey';
    const inputStyle = inputWidth ? { width: `${inputWidth.value}px` } : '';

    const format = (val: number) =>
      Math.min(Math.max(min.value, val, Number.MIN_SAFE_INTEGER), max.value, Number.MAX_SAFE_INTEGER);
    const plusValue = () => {
      console.log(stepperValue.value, props.step);
      if (stepperValue.value + props.step > props.max || props.disabled) return;
      stepperValue.value += props.step;
      console.log(stepperValue.value, props.step);
    };
    const minusValue = () => {
      if (stepperValue.value - props.step < props.min || props.disabled) return;
      stepperValue.value -= props.step;
    };
    const changeValue = (e: Event) => {
      const value = (e.target as HTMLTextAreaElement).value.split('.')[0].replace(/[^-0-9]/g, '');
      if (value.trim() === '') {
        stepperValue.value = 0;
      } else {
        stepperValue.value = format(Number(value));
      }
    };
    const onBlur = (e: Event) => {
      changeValue(e);
    };

    return {
      name,
      disabledClass,
      minusValue,
      stepperValue,
      plusValue,
      changeValue,
      inputStyle,
      onBlur,
      isPureMode,
      ...toRefs(props),
    };
  },
});
</script>
