<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Typography 排版</h1>
    <p class="summary">
      排版用于文本基础编排和样式，使用排版组件，可以快速完成页面中的文本内容制作，同时配合其他组件完成深色与浅色模式切换等风格统一的需求。
    </p>
    <tdesign-demo-block title="组件类型" summary="基础文本">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="组合用法">
      <combinationDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="主题样式">
      <themeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="可复制">
      <copyableDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="文本省略">
      <ellipsisDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import combinationDemo from './combination.vue';
import themeDemo from './theme.vue';
import copyableDemo from './copyable.vue';
import ellipsisDemo from './ellipsis.vue';
</script>
