<template>
  <div class="tdesign-mobile-demo sticky-demo">
    <h1 class="title">Sticky 吸顶容器</h1>
    <p class="summary">用于常驻页面顶部的信息、操作展示。</p>
    <tdesign-demo-block summary="01 基础吸顶">
      <t-sticky>
        <t-button>吸顶按钮</t-button>
      </t-sticky>
    </tdesign-demo-block>
    <tdesign-demo-block summary="02 吸顶距离">
      <t-sticky offset-top="50">
        <t-button>吸顶按钮</t-button>
      </t-sticky>
    </tdesign-demo-block>
    <tdesign-demo-block summary="03 指定容器">
      <t-sticky offset-top="50">
        <t-button>吸顶按钮</t-button>
      </t-sticky>
    </tdesign-demo-block>
  </div>
</template>

<style lang="less" scoped>
.sticky-demo {
  height: 1500px;
  overflow: scroll;
}
</style>
