<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Progress 进度条</h1>
    <p class="summary">用于展示任务当前的进度</p>
    <tdesign-demo-block title="01 类型" summary="基础进度条">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="隐藏数值进度条">
      <NoTextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义样式">
      <CustomDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义线宽">
      <StrokeWidthDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态">
      <StatusDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import NoTextDemo from './noText.vue';
import CustomDemo from './custom.vue';
import StrokeWidthDemo from './strokeWidth.vue';
import StatusDemo from './status.vue';
</script>
<style lang="less" scoped>
.progress-demo {
  padding: 8px 16px;
  background-color: #fff;
  .button-group {
    display: flex;
    justify-content: center;
    padding-bottom: 8px;
    .space {
      width: 16px;
    }
  }
}
</style>
