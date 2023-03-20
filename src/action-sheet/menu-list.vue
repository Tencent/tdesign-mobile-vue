<template>
  <div :class="`${name}__menu`">
    <button
      v-for="(item, index) in items"
      :key="index"
      :class="`${name}__cell`"
      :disabled="item.disabled"
      @click="handleSelected(index)"
    >
      <slot name="cell" :item="item">
        <div :class="`${name}__cell-text`" :style="{ color: item.color }">{{ item.label }}</div>
      </slot>
    </button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue';

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
  emits: ['selected'],
  setup(props, context) {
    const handleSelected = (index: number) => {
      context.emit('selected', index);
    };

    return {
      name: ref(name),
      handleSelected,
    };
  },
});
</script>
