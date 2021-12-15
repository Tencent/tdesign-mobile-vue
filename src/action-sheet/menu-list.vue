<template>
  <div :class="`${name}__menu`">
    <button
      v-for="(item, index) in items"
      :key="index"
      :class="`${name}__cell`"
      :disabled="item.disabled"
      @click="handleSelect(index)"
    >
      <slot name="cell" :item="item">
        <div :class="`${name}__cell-text`" :style="{ color: item.color }">{{ item.label }}</div>
      </slot>
    </button>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext, defineComponent, PropType } from 'vue';

import config from '../config';
import { ActionSheetItem } from './type';

const { prefix } = config;

const name = `${prefix}-action-sheet`;

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<ActionSheetItem[]>,
      required: true,
    },
  },
  emits: ['select'],
  setup(props, context: SetupContext) {
    const handleSelect = (index: number) => {
      context.emit('select', index);
    };

    return {
      name: ref(name),
      handleSelect,
    };
  },
});
</script>
