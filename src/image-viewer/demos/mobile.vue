<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">ImageViewer 图片预览</h1>
    <p class="summary">图片全屏放大预览效果，包含全屏背景色、页码位置样式、增加操作等规范</p>
    <tdesign-demo-block title="01 类型" summary="图片预览类型">
      <BaseDemo />
      <CloseBtnDemo />
      <CloseEventDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import BaseDemo from './base.vue';
import CloseBtnDemo from './closeBtn.vue';
import CloseEventDemo from './closeEvent.vue';
</script>
