<template>
  <t-cell :label="label" :class="[`${name}`, `${disabled? 't-is-disabled': ''}`]">
    <template v-if="hasLabel" #label>
      <slot name="label">
        <div v-if="label" :class="`${name}__label`">{{ label }}</div>
      </slot>
    </template>
    <template #default>
      <span :class="[`${name}__minus`,
                     `${(disabled || currentValue <= min) ? 't-is-disabled': ''}`]"
            @click="minusValue"></span>
      <input :class="`${name}__input`" type="tel" :style="inputStyle"
             pattern="[0-9]*" v-model="currentValue"
             :disabled="disableInput || disabled" @input="onInput"
             @blur="onBlur" :readonly="disableInput" />
      <span :class="[`${name}__plus`,
                     `${(disabled || currentValue >= max) ? 't-is-disabled': ''}`]"
            @click="plusValue"></span>
    </template>
  </t-cell>
</template>

<script lang="ts">
import { SetupContext, toRefs, computed, reactive } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-stepper`;
export interface StepperProps {
  label: string;
  disabled: boolean;
  disableInput: boolean;
  modelValue: string | number;
  min: number;
  max: number;
  step: number;
  inputWidth: number;
}

export default {
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
    const modelValue = Number(props.modelValue);
    const state = reactive({
      cacheValue: modelValue,
    });
    const currentValue = computed({
      get() {
        return modelValue || state.cacheValue;
      },
      set(val:number) {
        emit('update:modelValue', val);
        emit('change', val);
        state.cacheValue = val;
      },
    });
    const { min, max, inputWidth } = props;
    const inputStyle = inputWidth ? { width: `${inputWidth}px` } : '';
    console.log(inputStyle);
    const format = (val:number) => Math.min(Math.max(
      min, val,
      Number.MIN_SAFE_INTEGER,
    ), max, Number.MAX_SAFE_INTEGER);
    currentValue.value = format(modelValue);
    const plusValue = () => {
      if (state.cacheValue + props.step > props.max || props.disabled) return;
      currentValue.value = state.cacheValue + props.step;
    };
    const minusValue = () => {
      if (state.cacheValue - props.step < props.min || props.disabled) return;
      currentValue.value = state.cacheValue - props.step;
    };
    const changeValue = (e:Event) => {
      const value = (e.target as HTMLTextAreaElement).value.split('.')[0].replace(/[^-0-9]/g, '');
      if (value.trim() === '') {
        currentValue.value = 0;
      } else {
        currentValue.value = format(Number(value));
      }
    };
    const onBlur =  (e:Event) => {
      changeValue(e);
    };
    const onInput =  (e:Event) => {
      changeValue(e);
      emit('input', e);
    };
    const hasLabel = computed(() => {
      if (props.label) return true;
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
      onInput,
      ...toRefs(props),
    };
  },

};
</script>
