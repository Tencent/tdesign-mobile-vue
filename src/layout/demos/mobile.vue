<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Layout 布局</h1>
    <p class="summary">以规则的网格阵列来指导和规范页面中的版面布局以及信息分布，提高界面内布局的一致性，节约成本。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础用法">
      <BaseDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="在列元素之间增加间距">
      <OffsetDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import BaseDemo from './base.vue';
import OffsetDemo from './offset.vue';
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  // background-color: #fff;
  min-height: 100%;
  box-sizing: border-box;
}
</style>
