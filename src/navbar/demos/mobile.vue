<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">NavBar 导航栏</h1>
    <p class="summary">用于不同页面之间切换或者跳转，位于内容区的上方，系统状态栏的下方。</p>
    <tdesign-demo-block title="01 类型" summary="基础导航栏">
      <base-demo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="左侧双操作导航栏">
      <left-icon-demo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="右侧双操作导航栏">
      <right-icon-demo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import leftIconDemo from './left-icon.vue';
import rightIconDemo from './right-icon.vue';
</script>

<style lang="less" scoped>
.divide-line {
  width: 100%;
  height: 24px;
  background: #f9f9f9;
}

.btn-left {
  margin-right: 8px;
}
</style>
