<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Upload上传</h1>
    <p class="summary">用于相册读取或拉起拍照的图片上传功能。</p>
    <tdesign-demo-block title="01 组件类型" summary="单选上传">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="多选上传">
      <MultipleDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="加载状态">
      <StatusDemo />
    </tdesign-demo-block>
  </div>
</template>
<script setup lang="ts">
import BaseDemo from './base.vue';
import MultipleDemo from './multiple.vue';
import StatusDemo from './status.vue';
</script>
