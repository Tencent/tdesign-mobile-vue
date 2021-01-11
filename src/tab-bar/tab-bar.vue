<template>
  <div :class="name">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, watch, Ref } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-tab-bar`;

export default defineComponent({
  name,
  props: {
    modelValue: {
      type: [Array, Number, String],
      default: 0,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const activeValue = ref(props.modelValue || 0);
    const defaultIndex: Ref<number> = ref(-1);

    const updateChild = (currentValue: number | string) => {
      activeValue.value = currentValue;
    };

    watch(activeValue, (newValue) => {
      emit('update:modelValue', newValue);
      emit('change', newValue);
    });

    provide('tab-bar', {
      defaultIndex,
      activeValue,
      updateChild,
    });

    return {
      name,
    };
  },
});
</script>
