<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">TabBar 标签栏</h1>
    <p class="summary">用于在不同功能模块之间进行快速切换，位于页面底部。</p>
    <tdesign-demo-block title="01 组件类型" summary="纯文本标签栏">
      <TextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="图标加文字标签栏">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯图标标签栏">
      <PureIconDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="双层级纯文本标签栏">
      <TextSpreadDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="01 组件样式" summary="弱选中标签栏">
      <BadgePropsDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="悬浮胶囊标签栏">
      <RoundPropsDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 自定义" summary="自定义样式">
      <CustomPropsDemo />
    </tdesign-demo-block>
  </div>
</template>

<script setup lang="ts">
import TextDemo from './text.vue';
import BaseDemo from './base.vue';
import PureIconDemo from './pure-icon.vue';
import TextSpreadDemo from './text-spread.vue';
import BadgePropsDemo from './badge-props.vue';
import RoundPropsDemo from './round.vue';
import CustomPropsDemo from './custom.vue';
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  .t-tab-bar {
    position: relative;
  }
  .t-tab-bar + .t-tab-bar {
    margin-top: 16px;
  }
}
.t-icon {
  vertical-align: top;
}
</style>
