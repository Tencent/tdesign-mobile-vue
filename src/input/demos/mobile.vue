<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Input 输入框</h1>
    <p class="summary">用于单行文本信息输入。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础输入框">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带字数限制输入框">
      <maxlength />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带操作输入框">
      <suffix />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标输入框">
      <prefix />
    </tdesign-demo-block>
    <tdesign-demo-block summary="特定类型输入框">
      <special />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件状态" summary="输入框状态">
      <status />
    </tdesign-demo-block>
    <tdesign-demo-block summary="信息超长状态">
      <labelDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="03 组件样式" summary="内容位置">
      <align />
    </tdesign-demo-block>
    <tdesign-demo-block summary="竖排样式">
      <layout />
    </tdesign-demo-block>
    <tdesign-demo-block summary="非通栏样式">
      <banner />
    </tdesign-demo-block>
    <tdesign-demo-block summary="标签外置样式">
      <bordered />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义样式输入框">
      <custom />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import maxlength from './maxLength.vue';
import suffix from './suffix.vue';
import prefix from './prefix.vue';
import special from './special.vue';
import status from './status.vue';
import labelDemo from './label.vue';
import align from './align.vue';
import layout from './layout.vue';
import banner from './banner.vue';
import bordered from './bordered.vue';
import custom from './custom.vue';
</script>

<style lang="less">
.t-input + .t-input {
  margin-top: 16px;
}
</style>
