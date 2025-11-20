<template>
  <div>
    <t-calendar
      v-model:visible="visible"
      type="multiple"
      :min-date="minDate"
      :max-date="maxDate"
      :value="selectedDates"
      @confirm="handleConfirm"
      @scroll="onScroll"
      @select="handleSelect"
    ></t-calendar>
    <t-cell title="多个选择日期" arrow :note="dateNote" @click="visible = true"></t-cell>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TDate, CalendarValue, TCalendarValue } from 'tdesign-mobile-vue';

const visible = ref(false);
const dateNote = ref('');
const selectedDates = ref<TCalendarValue[]>([new Date(2022, 1, 18), new Date(2022, 1, 20)]); // 默认选择今天
const minDate = new Date(2022, 1, 1);
const maxDate = new Date(2022, 2, 15);
const formatDate = (date: Date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatMultipleDates = (dates: TCalendarValue[]) => {
  if (!dates || !dates.length) return '未选择';
  if (dates.length === 1) return formatDate(dates[0] as Date);

  const dateStrings = dates.map((date) => formatDate(date as Date));
  const result = dateStrings.join(', ');

  if (result.length > 12) {
    return `${result.substring(0, 16)}...`;
  }

  return result;
};

dateNote.value = formatMultipleDates(selectedDates.value);

const handleConfirm = (val: CalendarValue) => {
  console.log(val);
  if (Array.isArray(val)) {
    selectedDates.value = val;
    dateNote.value = formatMultipleDates(val);
  }
};

const handleSelect = (val: Date) => {
  console.log(val);
};

const onScroll = (context: { e: Event }) => {
  console.log('scroll: ', context.e);
};
</script>
