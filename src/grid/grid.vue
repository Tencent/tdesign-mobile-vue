<template>
  <div :class="`${name}`"><slot></slot></div>
</template>
<script lang="ts">
import { defineComponent, provide, toRefs } from 'vue';

import config from '../config';
import gridProps from './props';

const { prefix } = config;
const name = `${prefix}-grid`;

export default defineComponent({
  name,
  props: gridProps,
  setup(props) {
    const { column, gutter, border, align } = toRefs(props);

    provide('grid', {
      column,
      gutter,
      border,
      align,
    });

    return {
      name,
    };
  },
});
</script>
