<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DateTimePicker 时间选择器</h1>
    <p class="summary">用于选择一个时间点或者一个时间段</p>
    <tdesign-demo-block title="01 组件类型" summary="年月日选择器">
      <baseVue />
    </tdesign-demo-block>

    <tdesign-demo-block summary="年月选择器">
      <yearMonthVue />
    </tdesign-demo-block>

    <tdesign-demo-block summary="时分秒选择器">
      <hourMinuteSecondVue />
    </tdesign-demo-block>

    <tdesign-demo-block summary="时分选择器">
      <timeVue />
    </tdesign-demo-block>

    <tdesign-demo-block summary="年月日时分秒选择器">
      <allTimeVue />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件样式" summary="是否带标题">
      <withTitleVue />
      <noTitleVue />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import baseVue from './base.vue';
import yearMonthVue from './year-month.vue';
import hourMinuteSecondVue from './hour-minute-second.vue';
import timeVue from './time.vue';
import allTimeVue from './alltime.vue';
import withTitleVue from './withtitle.vue';
import noTitleVue from './notitle.vue';
</script>
