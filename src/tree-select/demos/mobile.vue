<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Toast 轻提示</h1>
    <p class="summary">一种轻量级反馈或提示，不会打断用户操作。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础树形选择">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="多选树形选择">
      <multipleDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="三级树形选择">
      <normalDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import multipleDemo from './multiple.vue';
import normalDemo from './normal.vue';
</script>
