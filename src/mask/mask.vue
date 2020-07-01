<template>
  <div :class="classes" @click="handleClick"></div>
</template>

<script lang="ts">
import { computed, toRefs, SetupContext } from 'vue';
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
  setup(props: MaskProps, context: SetupContext) {
    const classes = computed(() => ({
      [`${name}`]: !props.transparent,
      [`${name}--transparent`]: props.transparent,
    }));

    const handleClick = () => {
      context.emit('click');
    };

    return {
      classes,
      ...toRefs(props),
      handleClick,
    };
  },
};
</script>
