<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Typography 排版</h1>
    <p class="summary">用于定义页面中文本的基本格式，包括标题、正文及辅助文本等。</p>
    <tdesign-demo-block title="01 基础排版" summary="基础文本">
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
