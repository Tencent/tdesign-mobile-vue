<template>
  <t-skeleton :row-col="grid" :loading="loading"></t-skeleton>
</template>
<script lang="ts" setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  loading: Boolean,
});

const { loading } = toRefs(props);
const grid = [
  [
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
  ],
  [
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
  ],
];
</script>
