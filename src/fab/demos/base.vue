<template>
  <div>
    <t-fab class="demo-fab-button" icon="add"></t-fab>
    <t-fab class="demo-fab-button" icon="add" text="按钮文案"></t-fab>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({});
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
