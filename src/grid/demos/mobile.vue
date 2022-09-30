<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Grid 宫格</h1>
    <p class="summary">用于功能入口布局，将页面或特定区域切分成若干等大的区块，形成若干功能入口。</p>
    <tdesign-demo-block title="01 基础宫格" summary=" ">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 带说明宫格" summary=" ">
      <descDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 带徽标宫格" summary=" ">
      <badgeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import descDemo from './desc.vue';
import badgeDemo from './badge.vue';
</script>
