<template>
  <div>
    <t-fab class="demo-fab-button" />
    <t-fab class="demo-fab-button" text="按钮文案"></t-fab>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.demo-fab-button {
  right: 16px;
  bottom: 32px;

  &:first-child {
    bottom: 96px;
  }
}
</style>
