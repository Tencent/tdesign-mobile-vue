<template>
  <div :class="tabbarClass" role="tablist">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, watch, Ref, computed, SetupContext } from 'vue';
import TabBarProps from './props';
import config from '../config';
import { useDefault } from '../shared';

const { prefix } = config;
const name = `${prefix}-tab-bar`;

export default defineComponent({
  name,
  props: TabBarProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props, context: SetupContext) {
    const [activeValue] = useDefault(props, context.emit, 'value', 'change');
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
