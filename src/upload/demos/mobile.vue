<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Upload上传</h1>
    <p class="summary">用于相册读取或拉起拍照的图片上传功能。</p>
    <tdesign-demo-block title="01 类型" summary="单选上传图片">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="多选上传图片">
      <MultipleDemo />
    </tdesign-demo-block>
  </div>
</template>
<script setup lang="ts">
import BaseDemo from './base.vue';
import MultipleDemo from './multiple.vue';
</script>
