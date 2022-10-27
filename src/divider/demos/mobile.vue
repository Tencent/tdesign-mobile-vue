<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Divider 分割符</h1>
    <p class="summary">
      分割线是一个呈线状的轻量化组件，起到分割、组织、细化的作用，用于有逻辑的组织元素内容和页面结构。
    </p>
    <tdesign-demo-block title="01 类型" summary="分割符主要是由直线和文字组成">
      <div style="background: #fff">
        <baseDemo />
        <alignDemo />
        <verticalDemo />
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import baseDemo from './base.vue';
import alignDemo from './align.vue';
import verticalDemo from './vertical.vue';
</script>
