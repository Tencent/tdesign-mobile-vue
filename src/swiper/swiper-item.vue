<template>
  <div :class="name">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-swiper-item`;

export default defineComponent({
  name,
  setup() {
    return {
      name,
    };
  },
});
</script>
