<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">ColorPicker 颜色选择器</h1>
    <p class="summary">用于颜色选择，支持多种格式。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础颜色选择器">
      <baseVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带色板的颜色选择器">
      <multipleVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="弹窗形式的颜色选择器">
      <usePopup />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="组件模式选择">
      <formatVue />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseVue from './base.vue';
import multipleVue from './multiple.vue';
import usePopup from './use-popup.vue';
import formatVue from './format.vue';
</script>
