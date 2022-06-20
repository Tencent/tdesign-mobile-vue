<template>
  <span :class="name" :style="style">
    <i v-for="(item, index) of new Array(12)" :key="index" :class="[`${name}--line`, `${name}--line-${index + 1}`]"></i>
  </span>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-loading__spinner`;

export default defineComponent({
  name,
  props: {
    style: [Object, String],
  },
  setup() {
    return {
      name,
    };
  },
});
</script>
