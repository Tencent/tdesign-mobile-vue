<template>
  <div>
    <t-calendar
      v-model:visible="visible"
      switch-mode="year-month"
      :min-date="minDate"
      :max-date="maxDate"
      :value="defaultDate"
      :default-value="defaultDate"
      @scroll="onScroll"
      @confirm="handleConfirm"
      @select="handleSelect"
      @panel-change="onPanelChange"
    />
    <t-cell title="带翻页功能的日历" arrow :note="dateNote" @click="visible = true" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const dateNote = ref('');
const minDate = new Date(2012, 0, 0);
const maxDate = new Date(2032, 0, 0);
const defaultDate = new Date(2022, 1, 18);

const format = (val: Date) => {
  const date = new Date(val);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

dateNote.value = format(defaultDate);

const handleConfirm = (val: Date) => {
  console.log(val);
  dateNote.value = format(val);
};

const handleSelect = (val: Date) => {
  console.log('selected:', val);
};

const onPanelChange = (context: { year: number; month: number }) => {
  console.log('panel change: ', context.year, context.month);
};

const onScroll = (context: { e: Event }) => {
  console.log('scroll: ', context.e);
};
</script>
