<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Tag 标签</h1>
    <p class="summary">用于表明主体的类目，属性或状态。</p>
    <tdesign-demo-block title="01 组件类型">
      <Type />
      <Closable />
      <Checkable />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态">
      <Theme />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 组件尺寸">
      <div class="group padding-bottom d-flex">
        <Size />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import Type from './type.vue';
import Closable from './closable.vue';
import Checkable from './checkable.vue';
import Theme from './theme.vue';
import Size from './size.vue';
</script>

<style lang="less">
.tdesign-mobile-demo {
  background-color: var(--bg-color-demo, #fff);
}
.tag-demo {
  padding: 0 16px;
}
.tag-block {
  margin-bottom: 16px;
}
.group {
  padding: 16px;
  background-color: var(--bg-color-demo, #fff);
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
