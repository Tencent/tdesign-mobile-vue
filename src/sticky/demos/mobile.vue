<template>
  <div class="tdesign-mobile-demo sticky-demo-container">
    <h1 class="title">Sticky 吸顶</h1>
    <p class="summary">用于常驻页面顶部的信息、操作展示。</p>
    <tdesign-demo-block summary="基础吸顶" padding>
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="吸顶距离">
      <OffsetDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="指定容器">
      <ContainerDemo />
    </tdesign-demo-block>
  </div>
</template>

<script setup lang="ts">
import BaseDemo from './base.vue';
import OffsetDemo from './offset.vue';
import ContainerDemo from './container.vue';
</script>

<style lang="less" scoped>
.sticky-demo-container {
  height: 1500px;
}
</style>
