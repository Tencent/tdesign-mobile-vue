<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Badge 徽标</h1>
    <p class="summary">用于告知用户，该区域的状态变化或者待处理任务的数量。</p>
    <tdesign-demo-block title="01 类型" summary="徽标主要分红点、数字、文字和角标提醒">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block>
      <ButtonDemo />
    </tdesign-demo-block>
    <tdesign-demo-block>
      <CellDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import ButtonDemo from './button.vue';
import CellDemo from './cell.vue';
</script>

<style>
.tdesign-mobile-demo-block .badge-demo .badge-item {
  width: 24%;
  text-align: center;
}
</style>
