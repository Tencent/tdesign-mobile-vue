<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Rate 评分</h1>
    <p class="summary">用于对某行为/事物进行打分。</p>
    <br />
    <tdesign-demo-block title="01 组件类型" summary="实心评分">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义评分">
      <CustomDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义评分数量">
      <CountDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带描述评分">
      <ShowTextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态">
      <ActionDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 组件样式" summary="评分大小">
      <SizeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="设置评分颜色">
      <ColorDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 特殊样式" summary="竖向带描述评分">
      <SpecialDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import CustomDemo from './custom.vue';
import CountDemo from './count.vue';
import ShowTextDemo from './show-text.vue';
import ActionDemo from './action.vue';
import SizeDemo from './size.vue';
import ColorDemo from './color.vue';
import SpecialDemo from './special.vue';
</script>

<style lang="less">
.rate-demo-cell {
  background-color: #fff;
  padding: 12px 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  &__label {
    font-size: 16px;
    margin-right: 16px;
    min-width: 80px;
  }

  &--space {
    margin-bottom: 16px;
  }
}
</style>
