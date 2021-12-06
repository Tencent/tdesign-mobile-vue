<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-button-group`;

export default defineComponent({
  name,
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  setup(props) {
    const classes = computed(() => [`${name}`, `${name}--${props.type}`]);
    return { classes };
  },
});
</script>
