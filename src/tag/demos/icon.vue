<template>
  <t-tag theme="primary" :icon="iconTags.icon">{{ iconTags.name }}</t-tag>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';

const iconTags = ref({
  name: '标签',
  icon: () => h(AppIcon),
});
</script>
