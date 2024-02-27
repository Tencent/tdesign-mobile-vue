<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">ConfigProvider 全局配置</h1>
    <p class="summary">用于全局配置 Tdesign 组件，提供国际化能力。</p>
    <tdesign-demo-block title="01 组件类型" summary="组件国际化">
      <otherEn />
    </tdesign-demo-block>
    <tdesign-demo-block summary="">
      <tableEn />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import tableEn from './table-en.vue';
import otherEn from './other-en.vue';
</script>
