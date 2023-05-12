<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Collapse 折叠面板</h1>
    <p class="summary">用于对复杂区域进行分组和隐藏 常用于订单信息展示等</p>
    <tdesign-demo-block title="01 组件类型" summary="基础折叠面板">
      <baseVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="向上展开">
      <placementVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带操作说明">
      <actionVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="手风琴式">
      <accordionVue />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式" summary="卡片折叠面板">
      <cardVue />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseVue from './base.vue';
import placementVue from './placement.vue';
import accordionVue from './accordion.vue';
import actionVue from './action.vue';
import cardVue from './card.vue';
</script>
