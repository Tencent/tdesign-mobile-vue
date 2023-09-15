<template>
  <div
    :class="[
      `${name}`,
      {
        [`${name}--card`]: theme === 'card',
        [`${name}--auto-size`]: column === 0,
        [`${name}--bordered`]: border && !gutter,
      },
    ]"
    :style="rootStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, toRefs, computed } from 'vue';

import config from '../config';
import gridProps from './props';

const { prefix } = config;
const name = `${prefix}-grid`;

export default defineComponent({
  name,
  props: gridProps,
  setup(props) {
    const { column, gutter, border, align } = toRefs(props);
    const rootStyle = computed(() => {
      if (column.value === 0) return [];
      const ans = [
        `padding: ${gutter.value}px;`,
        `grid-template-columns: repeat(${column.value}, 1fr)`,
        `grid-gap: ${gutter.value}px`,
      ];

      return ans;
    });

    provide('grid', {
      column,
      border,
      align,
      gutter,
    });

    return {
      name,
      column,
      rootStyle,
    };
  },
});
</script>
