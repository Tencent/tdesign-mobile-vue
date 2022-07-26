<template>
  <t-result :theme="theme" :title="title" :description="description" />
</template>

<script lang="ts" setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  theme: String,
  title: String,
  description: String,
});

const { theme, title, description } = toRefs(props);
</script>
