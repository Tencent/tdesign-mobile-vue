<template>
  <div>
    <t-fab class="demo-fab-button" icon="add" text="按钮文案"></t-fab>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="less" scoped>
.demo-fab-button {
  position: relative;

  & + & {
    margin-left: 20px;
  }
}
</style>
