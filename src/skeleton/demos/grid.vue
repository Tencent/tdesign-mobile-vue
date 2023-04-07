<template>
  <t-skeleton :row-col="grid" :loading="true"></t-skeleton>
</template>
<script lang="ts" setup>
const grid = [
  [
    { width: '48px', height: '48px', borderRadius: '6px' },
    { width: '48px', height: '48px', borderRadius: '6px' },
    { width: '48px', height: '48px', borderRadius: '6px' },
    { width: '48px', height: '48px', borderRadius: '6px' },
    { width: '48px', height: '48px', borderRadius: '6px' },
  ],
  [
    { width: '48px', height: '16px', borderRadius: '3px' },
    { width: '48px', height: '16px', borderRadius: '3px' },
    { width: '48px', height: '16px', borderRadius: '3px' },
    { width: '48px', height: '16px', borderRadius: '3px' },
    { width: '48px', height: '16px', borderRadius: '3px' },
  ],
];
</script>
