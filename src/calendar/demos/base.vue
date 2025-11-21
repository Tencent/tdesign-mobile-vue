<template>
  <div>
    <t-calendar
      v-model:visible="visible"
      :min-date="minDate"
      :max-date="maxDate"
      :value="defaultDate"
      @close="onClose"
      @confirm="handleConfirm"
      @select="handleSelect"
    />
    <t-cell title="单个选择日期" arrow :note="dateNote" @click="visible = true" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { CalendarValue } from 'tdesign-mobile-vue';

const visible = ref(false);
const dateNote = ref('');
const minDate = new Date(2022, 1, 1);
const maxDate = new Date(2025, 2, 15);
const defaultDate = new Date(2023, 1, 18);
const format = (val: Date) => {
  const date = new Date(val);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
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
