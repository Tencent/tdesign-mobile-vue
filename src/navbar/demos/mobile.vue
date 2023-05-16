<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">NavBar 导航栏</h1>
    <p class="summary">用于不同页面之间切换或者跳转，位于内容区的上方，系统状态栏的下方。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础导航栏">
      <base-demo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="带搜索导航栏">
      <search-demo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="带图片导航栏">
      <img-demo />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件样式" summary="标题对齐">
      <left-title-demo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="标题尺寸">
      <size-demo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="自定义颜色">
      <custom-color-demo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import searchDemo from './search.vue';
import imgDemo from './img.vue';
import leftTitleDemo from './left-title.vue';
import sizeDemo from './size.vue';
import customColorDemo from './custom-color.vue';
</script>

<style lang="less" scoped>
.divide-line {
  width: 100%;
  height: 24px;
  background: #f9f9f9;
}

.btn-left {
  margin-right: 8px;
}
</style>
