<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Tag 标签</h1>
    <p class="summary">用于标记表示主体属性、类型、状态等，由底部图形和标签文字组成</p>
    <tdesign-demo-block title="01 类型" summary="基础标签">
      <ThemeDemo />
      <VariantDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标标签">
      <IconDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="圆角标签">
      <ShapeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="可关闭标签">
      <ClosableDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="超长省略标签">
      <EllipsisDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="标签状态">
      <CheckableDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="标签规格">
      <SizeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import EllipsisDemo from './ellipsis.vue';
import VariantDemo from './variant.vue';
import ShapeDemo from './shape.vue';
import ClosableDemo from './closable.vue';
import CheckableDemo from './checkable.vue';
import SizeDemo from './size.vue';
import ThemeDemo from './theme.vue';
import IconDemo from './icon.vue';
</script>

<style lang="less">
.group {
  padding: 16px;
  background-color: #fff;
  display: flex;
  align-items: center;

  &.d-flex {
    display: flex;
    align-items: flex-start;
  }

  &.padding-bottom {
    padding: 16px 16px 0;
  }

  .t-tag {
    margin-right: 16px;
  }
}
</style>
