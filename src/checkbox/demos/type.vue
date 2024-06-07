<template>
  <t-checkbox label="多选" icon="line" default-checked />
  <div style="height: 16px" />
  <t-checkbox label="多选" icon="rectangle" default-checked />
  <div style="height: 16px" />
  <t-checkbox value="checkbox1" label="图片图标" :icon="[activeImage, inActiveImage]" />
</template>
<script setup lang="ts">
const activeImage = 'https://tdesign.gtimg.com/mobile/demos/checkbox-checked.png';
const inActiveImage = 'https://tdesign.gtimg.com/mobile/demos/checkbox.png';
</script>
