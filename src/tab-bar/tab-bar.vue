<template>
  <div :class="tabbarClass" role="tablist">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, watch, Ref, computed } from 'vue';
import TabBarProps from './props';
import config from '../config';
import { emitEvent } from '@/shared';

const { prefix } = config;
const name = `${prefix}-tab-bar`;

export default defineComponent({
  name,
  props: TabBarProps,
  emits: ['update:value', 'change'],
  setup(props, context) {
    const activeValue = ref(props.value || 0);
    const defaultIndex: Ref<number> = ref(-1);

    const updateChild = (currentValue: number | string) => {
      activeValue.value = currentValue;
    };

    const tabbarClass = computed(() => [
      `${name}`,
      {
        [`${name}--bordered`]: props.bordered,
        [`${name}--fixed`]: props.fixed,
      },
    ]);

    watch(activeValue, (newValue) => {
      context.emit('update:value', newValue);
      emitEvent(props, context, 'change', newValue);
    });

    provide('tab-bar', {
      defaultIndex,
      activeValue,
      updateChild,
    });

    return {
      tabbarClass,
    };
  },
});
</script>
