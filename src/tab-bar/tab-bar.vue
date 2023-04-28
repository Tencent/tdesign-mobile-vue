<template>
  <div :class="tabBarClass" role="tablist">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, Ref, computed, toRefs, onMounted } from 'vue';
import TabBarProps from './props';
import config from '../config';
import { useDefault, useChildSlots } from '@/shared';

const { prefix } = config;
const name = `${prefix}-tab-bar`;

export default defineComponent({
  name,
  props: TabBarProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props, context) {
    const [activeValue] = useDefault(props, context.emit, 'value', 'change');
    const defaultIndex: Ref<number> = ref(-1);
    const itemCount = ref(0);

    onMounted(() => {
      const nodes = context.slots.default && context.slots.default();
      if (nodes !== undefined) {
        const childSlots = useChildSlots(`${prefix}-tab-bar-item`);
        itemCount.value = childSlots.length;
      }
    });

    const updateChild = (currentValue: number | string) => {
      activeValue.value = currentValue;
    };

    const tabBarClass = computed(() => [
      `${name}`,
      {
        [`${name}--bordered`]: props.bordered,
        [`${name}--fixed`]: props.fixed,
        [`${name}--safe`]: props.safeAreaInsetBottom,
      },
      `${name}--${props.shape}`,
    ]);

    provide('tab-bar', {
      ...toRefs(props),
      defaultIndex,
      activeValue,
      itemCount,
      updateChild,
    });

    return {
      tabBarClass,
    };
  },
});
</script>
