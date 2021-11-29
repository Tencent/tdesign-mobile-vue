<template>
  <div :class="compnentName">
    <slot/>
  </div>
</template>
<script lang="ts">

import config from '@/config';
import { computed, defineComponent } from 'vue';
const { prefix } = config;
const name = `${prefix}-swiper-item`;

export default defineComponent({
  name,
  setup() {
    const compnentName = computed(() => name);
    return {
      compnentName,
    };
  },
});
</script>
