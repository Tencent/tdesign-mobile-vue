<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Drawer 抽屉</h1>
    <p class="summary">用作一组平行关系页面/内容的切换器，相较于Tab，同屏可展示更多的选项数量。</p>
    <tdesign-demo-block title="01 类型" summary="基础抽屉">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标抽屉">
      <iconDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import baseDemo from './base.vue';
import iconDemo from './icon.vue';
</script>
<style lang="less" scoped></style>
