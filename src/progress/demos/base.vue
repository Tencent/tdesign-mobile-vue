<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Progress 进度条</h1>
    <p class="summary">进度展示</p>
    <tdesign-demo-block title="01 类型" summary="基础进度条">
      <div class="progress-demo">
        <t-progress :percentage="0" :show-text="false" />
        <t-progress :percentage="30" :show-text="false" />
        <t-progress :percentage="100" :show-text="false" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带数值进度条">
      <div class="progress-demo">
        <t-progress :percentage="0" />
        <t-progress :percentage="30" />
        <t-progress :percentage="100" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="中止状态">
      <div class="progress-demo">
        <t-progress type="error" :percentage="50" :show-text="false" />
        <t-progress type="error" :percentage="50" />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="less" scoped>
.progress-demo {
  padding: 16px;
  background: #fff;
  .t-progress {
    margin: 16px 0;
  }
}
</style>
