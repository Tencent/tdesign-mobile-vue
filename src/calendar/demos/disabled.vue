<!-- 含不可选的日历 -->
<template>
  <div>
    <t-calendar
      v-model:visible="visible"
      :min-date="minDate"
      :max-date="maxDate"
      :format="formatDate"
      :value="defaultDate"
      @close="onClose"
      @confirm="handleConfirm"
      @select="handleSelect"
    />
    <t-cell title="含不可选的日期" arrow :note="dateNote" @click="visible = true" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TDate, CalendarValue, TCalendarValue } from 'tdesign-mobile-vue';
import { D } from 'vitest/dist/chunks/reporters.d.BFLkQcL6';

const visible = ref(false);
const dateNote = ref('');
const minDate = new Date(2022, 1, 1);
const maxDate = new Date(2022, 2, 20);

const format = (val: Date) => {
  const date = new Date(val);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDate = (dateObj: TDate) => {
  const { date } = dateObj;
  // 这里通过formatDate来控制不可选的日期,，使得周六和周日不可选
  if (date.getDay() === 0 || date.getDay() === 6) {
    dateObj.type = 'disabled';
  }
  return dateObj;
};

const defaultDate = new Date(2022, 1, 18);
dateNote.value = format(defaultDate);

const handleConfirm = (val: CalendarValue) => {
  console.log(val);
  dateNote.value = format(val as Date);
};
const handleSelect = (val: Date) => {
  console.log(val);
};
const onClose = (trigger: string) => {
  console.log('closed by', trigger);
};
</script>
