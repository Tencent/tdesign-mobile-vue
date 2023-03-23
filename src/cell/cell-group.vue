<template>
  <div :class="rootClass">
    <div v-if="title" :class="`${name}__title`">
      <slot name="title">{{ title }}</slot>
    </div>

    <slot />
  </div>
</template>

<script lang="ts">
import { defineProps, computed } from 'vue';
import CellGroupProps from './cell-group-props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-cell-group`;

export default {
  name,
};
</script>

<script lang="ts" setup>
const props = defineProps(CellGroupProps);
const rootClass = computed(() => [name, `${name}--${props.theme}`]);
</script>
