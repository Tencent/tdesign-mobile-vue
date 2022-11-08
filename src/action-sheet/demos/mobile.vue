<template>
  <div class="tdesign-mobile-demo" :style="{ 'background-color': '#fff', height: '100vh' }">
    <h1 class="title">ActionSheet 动作面板</h1>
    <p class="summary">底部弹起的模态面板，包含与当前情境相关的多个选项。</p>
    <tdesign-demo-block title="01 类型" summary="列表型">
      <ListDemo />
      <GridDemo />
      <GridMultipleDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import ListDemo from './list.vue';
import GridDemo from './grid.vue';
import GridMultipleDemo from './grid-multiple.vue';
</script>

<style lang="less">
.action-sheet-grid-demo {
  > div {
    margin-top: 8px;
  }
}
</style>
