<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Cell 单元格</h1>
    <p class="summary">一行内容/功能的垂直排列方式。一行项目左侧为主要内容展示区域，右侧可增加更多操作内容</p>
    <tdesign-demo-block title="01 类型" summary="单行单元格">
      <SingleDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="多行单元格">
      <MultipleDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import SingleDemo from './single.vue';
import MultipleDemo from './multiple.vue';
</script>
