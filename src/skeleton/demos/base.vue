<template>
  <t-skeleton :theme="theme" :loading="loading" />
</template>
<script lang="ts" setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  theme: String,
  loading: Boolean,
});

const { loading } = toRefs(props);
</script>
