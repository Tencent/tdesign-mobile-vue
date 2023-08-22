<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Steps 步骤条</h1>
    <p class="summary">用于任务步骤展示或任务进度展示。</p>
    <tdesign-demo-block title="01 组件类型">
      <horizontal />
      <vertical />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件状态">
      <status />
    </tdesign-demo-block>

    <tdesign-demo-block title="03 特殊类型">
      <special />
    </tdesign-demo-block>
  </div>
</template>
<script setup lang="ts">
import horizontal from './horizontal.vue';
import vertical from './vertical.vue';
import status from './status.vue';
import special from './special.vue';
</script>

<style>
.steps-horizontal-demo-block {
  margin: 16px 0 24px;
  padding: 16px 0;
  background-color: var(--bg-color-demo, #fff);
}
.steps-vertical-demo-block {
  margin: 16px 0 24px;
  padding: 16px;
  background-color: var(--bg-color-demo, #fff);
}
</style>
