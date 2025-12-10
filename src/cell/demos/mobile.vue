<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Cell 单元格</h1>
    <p class="summary">用于各个类别行的信息展示。</p>
    <tdesign-demo-block title="01 组件类型" summary="单行单元格">
      <SingleDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="多行单元格">
      <MultipleDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式" summary="卡片单元格">
      <GroupDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import SingleDemo from './single.vue';
import MultipleDemo from './multiple.vue';
import GroupDemo from './group.vue';
</script>

<style scoped>
.tdesign-mobile-demo {
  padding-bottom: 66px;
}
</style>
