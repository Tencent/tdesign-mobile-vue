<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Empty 空状态</h1>
    <p class="summary">用于空状态时的占位提示。</p>
    <tdesign-demo-block summary="图标空状态">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义图片空状态">
      <imageEmpty />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带操作空状态">
      <buttonEmpty />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import baseDemo from './base.vue';
import imageEmpty from './imageEmpty.vue';
import buttonEmpty from './buttonEmpty.vue';
</script>

<style lang="less" scoped></style>
