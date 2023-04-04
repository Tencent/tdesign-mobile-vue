<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Picker 选择器</h1>
    <p class="summary">用于一组预设数据中的选择。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础选择器">
      <BaseDemo />
      <AreaDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式">
      <!-- <CasCadeDemo /> -->
      <titleDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import BaseDemo from './base.vue';
// import CasCadeDemo from './cascade.vue';
import titleDemo from './title.vue';
import AreaDemo from './area.vue';
</script>
