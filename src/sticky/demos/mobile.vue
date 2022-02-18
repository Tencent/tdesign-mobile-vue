<template>
  <div class="tdesign-mobile-demo sticky-demo">
    <h1 class="title">Sticky 吸顶容器</h1>
    <p class="summary">用于常驻页面顶部的信息、操作展示。</p>
    <tdesign-demo-block summary="01 基础吸顶">
      <t-sticky :z-index="5">
        <t-button theme="primary">吸顶按钮</t-button>
      </t-sticky>
    </tdesign-demo-block>
    <tdesign-demo-block summary="02 吸顶距离">
      <div class="block-2">
        <t-sticky :offset-top="50">
          <t-button theme="danger">吸顶按钮</t-button>
        </t-sticky>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="03 指定容器">
      <div ref="container" class="block-3">
        <t-sticky container=".block-3" @scroll="onScroll">
          <t-button>吸顶按钮</t-button>
        </t-sticky>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script setup lang="ts">
const onScroll = (context: { scrollTop: number; isFixed: boolean }) => {
  console.log(context);
};
</script>

<style lang="less" scoped>
.sticky-demo {
  height: 1500px;
}
.block-2 {
  padding-left: 120px;
}
.block-3 {
  background: white;
  height: 200px;
  padding-left: 250px;
}
</style>
