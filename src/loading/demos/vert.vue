<template>
  <div class="container">
    <t-loading text="加载中" layout="vertical" />
    <t-loading theme="spinner" text="加载中..." layout="vertical" />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.container {
  display: flex;
}

.t-loading {
  margin-right: 64px;
}
</style>
