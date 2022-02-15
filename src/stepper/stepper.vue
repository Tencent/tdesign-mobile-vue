<template>
  <div :class="[`${name}`, `${disabled ? disabledClass : ''}`, `${isPureMode ? `${name}__pure` : ''}`]">
    <span
      :class="[`${name}__minus`, `${disabled || currentValue <= min ? 't-is-disabled' : ''}`]"
      @click="minusValue"
    ></span>
    <input
      v-model="currentValue"
      :class="`${name}__input`"
      type="tel"
      :style="inputStyle"
      pattern="[0-9]*"
      :disabled="disableInput || disabled"
      :readonly="disableInput"
      @blur="onBlur"
    />
    <span
      :class="[`${name}__plus`, `${disabled || currentValue >= max ? 't-is-disabled' : ''}`]"
      @click="plusValue"
    ></span>
  </div>
</template>

<script lang="ts">
import { toRefs, computed, reactive, defineComponent } from 'vue';
import config from '../config';
import StepperProps from './props';
import CLASSNAMES from '../shared/constants';
import { emitEvent } from '@/shared';

const { prefix } = config;
const name = `${prefix}-stepper`;
const disabledClass = CLASSNAMES.STATUS.disabled;
export default defineComponent({
  name,
  props: StepperProps,
  emits: ['update:value', 'change'],
  setup(props, context) {
    const { emit } = context;
    const state = reactive({
      cacheValue: Number(props.value || props.defaultValue),
    });
    const currentValue = computed({
      get() {
        return Number(props.value) || state.cacheValue;
      },
      set(val: number) {
        emitEvent(props, context, 'change', val);
        emit('update:value', val);
        console.log(val, props.value);
        state.cacheValue = val;
      },
    });

    const { min, max, inputWidth, theme } = toRefs(props);
    const isPureMode = theme.value === 'mode';
    const inputStyle = inputWidth ? { width: `${inputWidth.value}px` } : '';

    const format = (val: number) =>
      Math.min(Math.max(min.value, val, Number.MIN_SAFE_INTEGER), max.value, Number.MAX_SAFE_INTEGER);
    currentValue.value = format(Number(props.value));
    const plusValue = () => {
      if (state.cacheValue + props.step > props.max || props.disabled) return;
      currentValue.value = state.cacheValue + props.step;
    };
    const minusValue = () => {
      if (state.cacheValue - props.step < props.min || props.disabled) return;
      currentValue.value = state.cacheValue - props.step;
    };
    const changeValue = (e: Event) => {
      const value = (e.target as HTMLTextAreaElement).value.split('.')[0].replace(/[^-0-9]/g, '');
      if (value.trim() === '') {
        currentValue.value = 0;
      } else {
        currentValue.value = format(Number(value));
      }
    };
    const onBlur = (e: Event) => {
      changeValue(e);
    };

    return {
      name,
      disabledClass,
      minusValue,
      currentValue,
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
