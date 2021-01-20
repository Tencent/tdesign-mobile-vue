<template>
  <div :class="name">
    <div v-if="title" :class="`${name}--title`">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div
      :class="{
        [`${name}-container`]: true,
        'border--top-bottom': border,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-cell-group`;

export default defineComponent({
  name,
  props: {
    title: {
      type: String,
      default: '',
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return { name };
  }
});
</script>
