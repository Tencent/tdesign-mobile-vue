<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { computed } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-button-group`;

export interface ButtonGroup{
  type: {
    type: String;
    default: 'default';
  };
}

export default {
  name,
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  setup(props:ButtonGroup) {
    const classes = computed(() => [
      `${name}`,
      `${name}--${props.type}`,
    ]);
    return { classes };
  },
};
</script>
