<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Overlay 遮罩层</h1>
    <p class="summary">通过遮罩层，可以强调部分内容</p>
    <tdesign-demo-block title="01 组件类型" summary="基础遮罩层">
      <div class="demo-block">
        <BaseDemo />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
</script>

<style lang="less">
body,
#app,
.tdesign-mobile-demo {
  background-color: var(--bg-color-demo, #fff);

  .demo-block {
    padding: 0 16px;
  }

  .t-button {
    margin-bottom: 16px;
  }
}
</style>
