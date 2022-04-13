<template>
  <div :class="name">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, inject } from 'vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-swiper-item`;

export default defineComponent({
  name,
  setup() {
    const parent = inject('parent') as any;
    parent.relation(getCurrentInstance());
    return {
      name,
    };
  },
});
</script>
