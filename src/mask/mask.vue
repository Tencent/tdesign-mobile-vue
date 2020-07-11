<template>
  <div :class="classes"></div>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-mask`;

export interface MaskProps {
  transparent: Boolean;
}

export default {
  name,
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: MaskProps) {
    const classes = computed(() => ({
      [`${name}`]: !props.transparent,
      [`${name}--transparent`]: props.transparent,
    }));

    return {
      classes,
      ...toRefs(props),
    };
  },
};
</script>
