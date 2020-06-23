<template>
  <div :class="[`${name}`, `${disabled? `${name}--disabled`: ''}`]">
    <span :class="[`${name}__reduce`,
                   `${(disabled || currentValue <= min) ? `${name}__reduce--disabled`: ''}`]"
          @click="reduceValue"></span>
    <input :class="`${name}__input`" type="number" pattern="[0-9]*" v-model="currentValue"
           :disabled="disableInput || disabled" @blur="changeValue"/>
    <span :class="[`${name}__add`,
                   `${(disabled || currentValue >= max) ? `${name}__add--disabled`: ''}`]"
          @click="addValue"></span>
  </div>
</template>

<script lang="ts">
import { SetupContext, toRefs, computed, reactive } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-stepper`;
export interface StepperProps {
  disabled: boolean;
  disableInput: boolean;
  modelValue: number;
  min: number;
  max: number;
  step: number;
}

export default {
  name,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    disableInput: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Number,
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
  },
  setup(props: StepperProps, context: SetupContext) {
    const { emit } = context;
    const state = reactive({
      cacheValue: props.modelValue,
    });
    const currentValue = computed({
      get() {
        return props.modelValue || state.cacheValue;
      },
      set(val:number) {
        emit('update:modelValue', val);
        emit('change', val);
        state.cacheValue = val;
      },
    });
    const { modelValue, min, max } = props;
    currentValue.value = Math.min(Math.max(min, modelValue), max);
    const addValue = () => {
      if (state.cacheValue + props.step >= props.max || props.disabled) return;
      currentValue.value = state.cacheValue + props.step;
    };
    const reduceValue = () => {
      if (state.cacheValue - props.step >= props.max || props.disabled) return;
      currentValue.value = state.cacheValue - props.step;
    };
    const changeValue = (e:Event) => {
      const value = (e.target as HTMLTextAreaElement).value;
      if (value.trim() === '') {
        currentValue.value = 0;
      }
      currentValue.value = Math.min(Math.max(min, Number(value)), max);
    };
    return {
      name,
      reduceValue,
      currentValue,
      addValue,
      changeValue,
      ...toRefs(props),
    };
  },

};
</script>
