<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">CountDown 倒计时</h1>
    <p class="summary">用于实时展示倒计时数值。</p>
    <tdesign-demo-block title="01 组件类型" :padding="true">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件尺寸" summary="倒计时 large/medium/small 尺寸" :padding="true">
      <sizeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import sizeDemo from './size.vue';
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
