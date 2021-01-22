<template>
  <t-cell :label="label" :class="[`${name}`, `${disabled ? 't-is-disabled' : ''}`]">
    <template v-if="hasLabel" #label>
      <slot name="label">
        <div v-if="label" :class="`${name}__label`">{{ label }}</div>
      </slot>
    </template>
    <template #default>
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
        @input="onInput"
        @blur="onBlur"
      />
      <span
        :class="[`${name}__plus`, `${disabled || currentValue >= max ? 't-is-disabled' : ''}`]"
        @click="plusValue"
      ></span>
    </template>
  </t-cell>
</template>

<script lang="ts">
// XXX: 组件内的样式需要修改到代码逻辑中
import { SetupContext, toRefs, computed, reactive, defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-stepper`;
export interface StepperProps {
  label: string;
  disabled: boolean;
  disableInput: boolean;
  modelValue: number | string;
  min: number;
  max: number;
  step: number;
  inputWidth: number;
}

export default defineComponent({
  name,
  props: {
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disableInput: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10000,
    },
    step: {
      type: Number,
      default: 1,
    },
    inputWidth: {
      type: Number,
      default: null,
    },
  },
  setup(props: StepperProps, context: SetupContext) {
    const { emit } = context;
    const state = reactive({
      cacheValue: Number(props.modelValue),
    });
    const currentValue = computed({
      get() {
        return Number(props.modelValue) || state.cacheValue;
      },
      set(val: number) {
        emit('change', val);
        emit('update:modelValue', val);
        console.log(val, props.modelValue);
        state.cacheValue = val;
      },
    });
    const { min, max, inputWidth } = toRefs(props);
    const inputStyle = inputWidth ? { width: `${inputWidth.value}px` } : '';
    console.log(inputStyle);
    const format = (val: number) =>
      Math.min(Math.max(min.value, val, Number.MIN_SAFE_INTEGER), max.value, Number.MAX_SAFE_INTEGER);
    currentValue.value = format(Number(props.modelValue));
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
    const hasLabel = computed(() => {
      if (props.label) {
        return true;
      }
      return false;
    });
    return {
      name,
      minusValue,
      currentValue,
      plusValue,
      changeValue,
      inputStyle,
      hasLabel,
      onBlur,
      ...toRefs(props),
    };
  },
});
</script>
