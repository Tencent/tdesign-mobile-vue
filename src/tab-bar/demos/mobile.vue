<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">TabBar 标签栏</h1>
    <p class="summary">移动端的主导航，用做功能模块之间的切换</p>
    <tdesign-demo-block title="01 类型" summary="基础标签栏">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带徽章标签栏">
      <badgePropsDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯文本标签栏">
      <textDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯图标标签栏">
      <pureIconDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="双层级纯文本标签栏">
      <textSpreadDemo />
    </tdesign-demo-block>
  </div>
</template>

<script setup lang="ts">
import baseDemo from './base.vue';
import badgePropsDemo from './badge-props.vue';
import textDemo from './text.vue';
import pureIconDemo from './pure-icon.vue';
import textSpreadDemo from './text-spread.vue';
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  .t-tab-bar {
    position: relative;
  }
  .t-tab-bar + .t-tab-bar {
    margin-top: 16px;
  }
}
</style>
