<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Comment 评论</h1>
    <p class="summary">评论用于对页面内容的反馈、评价、讨论等，如对文章的评价，对话题的讨论等。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础评论">
      <baseVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="图片评论">
      <imageVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="文字+图片评论">
      <mixedVue />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式" summary="展开+收起">
      <collapseVue />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseVue from './base.vue';
import imageVue from './image.vue';
import mixedVue from './mixed.vue';
import collapseVue from './collapse.vue';
</script>
