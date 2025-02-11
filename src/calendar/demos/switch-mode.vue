<template>
  <div>
    <t-calendar
      v-model:visible="visible"
      switch-mode="year-month"
      :min-date="minDate"
      :max-date="maxDate"
      @scroll="onScroll"
      @confirm="handleConfirm"
      @panel-change="onPanelChange"
    />
    <t-cell title="带翻页功能" arrow :note="dateNote" @click="visible = true" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const dateNote = ref('');
const minDate = new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000);
const maxDate = new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000);

const format = (val: Date) => {
  const date = new Date(val);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const handleConfirm = (val: Date) => {
  console.log(val);
  dateNote.value = format(val);
};
const onPanelChange = (year: number, month: number) => {
  console.log('panel change: ', year, month);
};
const onScroll = (e: Event) => {
  console.log('scroll: ', e);
};
</script>
