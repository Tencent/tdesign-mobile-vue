<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Tag 标签</h1>
    <p class="summary">用于标记表示主体属性、类型、状态等，由底部图形和标签文字组成</p>
    <tdesign-demo-block title="01 类型" summary="基础标签">
      <div class="tag-demo">
        <ThemeDemo />
      </div>
      <div class="tag-demo">
        <VariantDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标标签">
      <div class="tag-demo">
        <IconDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="圆角标签">
      <div class="tag-demo">
        <ShapeDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="可关闭标签">
      <div class="tag-demo">
        <ClosableDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="超长省略标签">
      <div class="tag-demo">
        <EllipsisDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="标签状态">
      <div class="tag-demo">
        <CheckableDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="标签规格">
      <div class="group padding-bottom d-flex">
        <SizeDemo />
      </div>
      <div class="group d-flex">
        <t-check-tag size="large">点击标签30</t-check-tag>
        <t-check-tag size="medium">点击标签24</t-check-tag>
      </div>
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
