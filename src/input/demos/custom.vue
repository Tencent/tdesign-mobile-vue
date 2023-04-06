<template>
  <div :style="style">
    <t-input label="标签文字" placeholder="请输入文字" />
  </div>
</template>

<script lang="ts" setup>
const style =
  'padding-bottom: 48rpx; --td-input-bg-color: rgba(44, 44, 44, 1); --td-input-border-color: rgba(75, 75, 75, 1); --td-input-default-text-color: rgba(255, 255, 255, 1); --td-input-placeholder-text-color: rgba(255, 255, 255, 0.35); --td-input-label-text-color: rgba(255, 255, 255, 1);';
</script>
