<template>
  <div :class="[`${name}`, `${name}--${size}`]">
    <div
      :class="[
        `${name}__minus`,
        `${name}__minus--${theme}`,
        `${name}__icon--${size}`,
        `${disabled || stepperValue <= min ? name + '--' + theme + '-disabled' : ''}`,
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
        `${disabled || stepperValue >= max ? name + '--' + theme + '-disabled' : ''}`,
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
import { useDefault, useEmitEvent } from '../shared';
import { TdStepperProps } from './type';

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
    const [stepperValue] = useDefault<number, TdStepperProps>(props, context.emit, 'value', 'change');
    const emitEvent = useEmitEvent(props, context.emit);

    const { min, max, step, inputWidth, disabled } = toRefs(props);
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
      minusValue,
      stepperValue,
      plusValue,
      handleInput,
      handleChange,
      inputStyle,
      handleFocus,
      handleBlur,
      ...toRefs(props),
    };
  },
});
</script>
