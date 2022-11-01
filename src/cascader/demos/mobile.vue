<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Cascader 级联选择器</h1>
    <p class="summary">用于多层级数据选择，主要为树形结构，可展示更多的数据</p>
    <tdesign-demo-block title="01 基础" summary="基本用法">
      <base-demo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="禁用可选项">
      <status-demo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import baseDemo from './base.vue';
import statusDemo from './status.vue';
</script>
