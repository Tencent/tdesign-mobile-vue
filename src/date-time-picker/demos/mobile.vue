<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DateTimePicker 时间选择器</h1>
    <p class="summary">用于选择一个时间点或者一个时间段</p>
    <tdesign-demo-block title="01 类型" summary="基本用法">
      <baseVue />
      <yearMonthVue />
      <timeVue />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 自定义" summary="自定义选择范围">
      <customRangeVue />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import baseVue from './base.vue';
import yearMonthVue from './year-month.vue';
import timeVue from './time.vue';
import customRangeVue from './custom-range.vue';
</script>
