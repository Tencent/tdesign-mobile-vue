<template>
  <t-color-picker @change="onChange" />
</template>
<script setup lang="ts">
const onChange = (val: string, context: { color: any; trigger: string }) => {
  console.log('change: ', val, context);
};
</script>
