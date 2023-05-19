<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">ImageViewer 图片预览</h1>
    <p class="summary">图片全屏放大预览效果，包含全屏背景色、页码位置样式、增加操作等规范</p>
    <tdesign-demo-block title="01 组件类型" summary="图片预览类型" padding="true">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带操作图片预览" padding="true">
      <operationDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import BaseDemo from './base.vue';
import operationDemo from './operation.vue';
</script>

<style scoped>
.tdesign-mobile-demo {
  background-color: #fff;
  min-height: 100vh;
}
</style>
