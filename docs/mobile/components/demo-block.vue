<template>
  <div class="tdesign-mobile-demo-block">
    <h2 v-if="title" class="tdesign-mobile-demo-block__title">{{ title }}</h2>
    <p  v-if="summary" class="tdesign-mobile-demo-block__summary">{{ summary }}</p>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: String,
  summary: String,
});
</script>
