<template>
  <div>
    <slot name="title">
      <div v-if="title" :class="styleTitle">{{ title }}</div>
    </slot>
    <div :class="styleWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-cell-group`;


export interface CellGroupProps {
  title: string;
  border: {
    type: string;
    default: true;
  };
}

export default {
  name,
  props: {
    title: String,
    border: {
      type: Boolean,
      default: true,
    },
  },
  setup(props: CellGroupProps) {
    const styleWrapper = computed(() => (props.border ? `${name} border--top-bottom` : name));
    const styleTitle = ref(`${name}--title`);

    return {
      styleWrapper,
      styleTitle,
    };
  },
};
</script>
