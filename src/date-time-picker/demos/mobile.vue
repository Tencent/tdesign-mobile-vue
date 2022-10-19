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
import { computed, reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { DateValue } from '../type';
import baseVue from './base.vue';
import yearMonthVue from './year-month.vue';
import timeVue from './time.vue';
import customRangeVue from './custom-range.vue';

const modeArray = ['date', 'second'];

const mode = ref(modeArray);
const show = reactive({
  ymdhms: false,
  ymd: false,
  ym: false,
  hm: false,

  ymdhms2: false,
  ymdhms3: false,
});
const text = reactive({
  ymdhms: '2020-08-10 12:50:00',
  ymd: '2020-08-10',
  ym: '2020-08',
  hm: '2020-08-10 12:01',

  ymdhms2: '2020-08-10 12:50:00',
  ymdhms3: '2020-08-10 12:50:00',
});

const showHm = computed(() => {
  return dayjs(text.hm).format('HH:mm');
});

const onChange = (value: DateValue) => {
  console.log('date-time-picker:change', value);
};

const onPick = (value: DateValue) => {
  console.log('date-time-picker:pick', value);
};

const onCancel = () => {
  console.log('date-time-picker:cancel');
  Object.keys(show).forEach((item) => (show[item] = false));
};

const onConfirm = (value: DateValue) => {
  console.log('date-time-picker:confirm', value);
  Object.keys(show).forEach((item) => (show[item] = false));
};

const renderLabel = (type: string, value: number) => {
  if (type === 'year') {
    return `${value}年`;
  }
  if (type === 'month') {
    return `${value}月`;
  }
  if (type === 'date') {
    return `${value}日`;
  }
  return value;
};
</script>
