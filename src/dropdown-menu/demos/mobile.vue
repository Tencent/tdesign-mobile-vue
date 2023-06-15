<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DropdownMenu 下拉菜单</h1>
    <p class="summary">菜单呈现数个并列的选项类目，用于整个页面的内容筛选，由菜单面板和菜单选项组成。</p>
    <tdesign-demo-block title="01 组件类型" summary="单选下拉菜单">
      <singleVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="分栏下拉菜单">
      <multipleVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="向上展开">
      <directionVue />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="禁用状态">
      <disabledVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="插槽样式">
      <customizedVue />
    </tdesign-demo-block>
    <div style="height: 40px" />
  </div>
</template>

<script lang="ts" setup>
import customizedVue from './customized.vue';
import singleVue from './single.vue';
import multipleVue from './multiple.vue';
import disabledVue from './disabled.vue';
import directionVue from './direction.vue';
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  height: 1000px;
}
</style>
