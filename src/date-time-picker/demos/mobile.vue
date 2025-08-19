<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DateTimePicker 时间选择器</h1>
    <p class="summary">用于选择一个时间点或者一个时间段</p>
    <tdesign-demo-block title="01 组件类型" summary="年月日选择器">
      <yearMonthDateDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="年月选择器">
      <yearMonthDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="时分秒选择器">
      <hourMinuteSecondDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="时分选择器">
      <hourMinuteDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="年月日时分秒选择器">
      <dateAllDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="年月日带星期选择器">
      <showWeekDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件样式" summary="是否带标题">
      <withTitleDemo />
    </tdesign-demo-block>

    <tdesign-demo-block>
      <withoutTitleDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import yearMonthDateDemo from './year-month-date.vue';
import yearMonthDemo from './year-month.vue';
import hourMinuteSecondDemo from './hour-minute-second.vue';
import hourMinuteDemo from './hour-minute.vue';
import dateAllDemo from './date-all.vue';
import showWeekDemo from './show-week.vue';
import withTitleDemo from './with-title.vue';
import withoutTitleDemo from './without-title.vue';
</script>
