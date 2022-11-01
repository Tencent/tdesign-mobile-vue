<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Rate 评分</h1>
    <p class="summary">用于对某行为/事物进行打分。</p>
    <tdesign-demo-block title="01 类型" summary="实心评分">
      <FilledDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="空心评分">
      <OutlineDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义数量评分">
      <CountDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="半星评分">
      <AllowHalfDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带描述评分">
      <TextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="禁用评分">
      <DisabledDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="设置评分颜色">
      <ColorDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 规格" summary="评价规格">
      <SizeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义图标评分">
      <IconDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import IconDemo from './icon.vue';
import SizeDemo from './size.vue';
import ColorDemo from './color.vue';
import DisabledDemo from './disabled.vue';
import CountDemo from './count.vue';
import FilledDemo from './filled.vue';
import OutlineDemo from './outline.vue';
import TextDemo from './text.vue';
import AllowHalfDemo from './allow-half.vue';
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
