<template>
  <div :class="name" role="tablist">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, watch, Ref } from 'vue';
import TabBarProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-tab-bar`;

export default defineComponent({
  name,
  props: TabBarProps,
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const activeValue = ref(props.value || 0);
    const defaultIndex: Ref<number> = ref(-1);

    const updateChild = (currentValue: number | string) => {
      activeValue.value = currentValue;
    };

    watch(activeValue, (newValue) => {
      emit('update:value', newValue);
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
