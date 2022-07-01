<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Picker 选择器</h1>
    <p class="summary">用于选择一个地区的省、市、区、街道等，包含树形用于多层级地区选择以及行政区单层选择</p>
    <tdesign-demo-block title="01 类型" summary="基础选择器">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 联动" summary="数据联动选择器">
      <CasCadeDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import BaseDemo from './base.vue';
import CasCadeDemo from './cascade.vue';
</script>
