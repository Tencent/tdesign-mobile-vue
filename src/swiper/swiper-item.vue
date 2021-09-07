<template>
  <div class="t-swiper-item">
    <slot/>
  </div>
</template>
<script lang="ts">

import config from '@/config';
import { defineComponent } from 'vue';
const { prefix } = config;

export default defineComponent({
  name: `${prefix}-swiper-item`,
});
</script>
