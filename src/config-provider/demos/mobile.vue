<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">ConfigProvider 全局配置</h1>
    <p class="summary">全局特性配置包含各个组件的文本语言配置及其他通用配置，可以减少重复的通用配置。</p>
    <tdesign-demo-block title="01 配置示例" summary="Upload">
      <uploadEn />
    </tdesign-demo-block>
    <tdesign-demo-block summary="Table">
      <tableEn />
    </tdesign-demo-block>
    <tdesign-demo-block summary="其他组件">
      <otherEn />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import uploadEn from './upload-en.vue';
import tableEn from './table-en.vue';
import otherEn from './other-en.vue';
</script>
