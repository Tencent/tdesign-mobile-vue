<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Search 搜索框</h1>
    <p class="summary">用于用户输入搜索信息，并进行页面内容搜索</p>
    <tdesign-demo-block title="01 类型">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态">
      <statusDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import statusDemo from './status.vue';
</script>

<style lang="less">
.t-cell-group__title {
  font-size: 12px;
  line-height: 20px;
  padding: 16px;
}
</style>
