<template>
  <t-calendar
    v-model:visible="visible"
    :value="value"
    :format="format"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="handleConfirm"
    @select="handleSelect"
  />
  <t-cell title="带单行描述的日历" arrow :note="dateNote" @click="visible = true"></t-cell>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TDate, CalendarValue, TCalendarValue } from 'tdesign-mobile-vue';

const minDate = new Date(2022, 1, 1);
const maxDate = new Date(2022, 2, 15);
const format = (day: TDate) => {
  const { date } = day;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const curDate = date.getDate();

  day.suffix = '¥60';

  if (year === 2022) {
    if (month === 2) {
      const map = {
        1: '初一',
        2: '初二',
        3: '初三',
        14: '情人节',
        15: '元宵节',
      };
      if (curDate in map) {
        day.suffix = '¥100';
      }
    }
  }

  return day;
};

const visible = ref(false);
const value = new Date(2022, 1, 18);
const dateNote = ref('');

const formatDate = (val: Date) => {
  const date = new Date(val);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

dateNote.value = formatDate(value);

const handleConfirm = (val: CalendarValue) => {
  console.log(val);
  dateNote.value = formatDate(val as Date);
};

const handleSelect = (val: Date) => {
  console.log(val);
};
</script>
