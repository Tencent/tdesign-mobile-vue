<template>
  <div class="tdesign-mobile-typography-demo">
    <t-typography-text theme="primary">常规</t-typography-text>
    <t-typography-text theme="secondary">主色</t-typography-text>
    <t-typography-text theme="success">成功</t-typography-text>
    <t-typography-text theme="warning">警告</t-typography-text>
    <t-typography-text theme="error">错误</t-typography-text>
    <t-typography-text mark>标记</t-typography-text>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.tdesign-mobile-typography-demo {
  padding: 0 16px;
  background-color: var(--bg-color-demo, #fff);
  display: flex;
  gap: 24px;
}
</style>
