<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Drawer 抽屉</h1>
    <p class="summary">用作一组平行关系页面/内容的切换器，相较于Tab，同屏可展示更多的选项数量。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础抽屉" :padding="true">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标抽屉" :padding="true">
      <iconDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式" summary="带标题抽屉" :padding="true">
      <titleDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带底部插槽样式" :padding="true">
      <footerDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 使用方式" summary="使用命令行" :padding="true">
      <pluginDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import iconDemo from './icon.vue';
import titleDemo from './title.vue';
import footerDemo from './footer.vue';
import pluginDemo from './plugin.vue';
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
