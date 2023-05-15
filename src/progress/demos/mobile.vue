<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Progress 进度条</h1>
    <p class="summary">用于展示任务当前的进度</p>
    <tdesign-demo-block title="01 类型" summary="基础进度条" :padding="true">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="过渡样式" :padding="true">
      <TransitionDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义颜色/圆角" :padding="true">
      <CustomDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="线性进度条" :padding="true">
      <LineDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="百分比内显进度条" :padding="true">
      <PlumpDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="环形进度条" :padding="true">
      <CircleDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import CustomDemo from './custom.vue';
import TransitionDemo from './transition.vue';
import LineDemo from './line.vue';
import PlumpDemo from './plump.vue';
import CircleDemo from './circle.vue';
</script>
<style lang="less" scoped>
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
