<template>
  <div :class="name">
    <slot/>
  </div>
</template>
<script lang="ts">
import config from '@/config';
import { defineComponent } from 'vue';
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
