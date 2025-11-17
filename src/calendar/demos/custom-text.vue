<template>
  <t-calendar
    v-model:visible="visible"
    :format="format"
    :max-date="maxDate"
    :min-date="minDate"
    :value="value"
    @confirm="handleConfirm"
    @select="handleSelect"
  />
  <t-cell :note="dateNote" arrow title="带双行描述的日历" @click="visible = true"></t-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

type TDateType = 'selected' | 'disabled' | 'start' | 'centre' | 'end' | '';

interface TDate {
  date: Date;
  day: number;
  type: TDateType;
  className?: string;
  prefix?: string;
  suffix?: string;
}

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
      const map: Record<number, string> = {
        1: '初一',
        2: '初二',
        3: '初三',
        14: '情人节',
        15: '元宵节',
      };
      if (curDate in map) {
        day.prefix = map[curDate];
        day.suffix = '¥100';
        day.className = 'is-holiday';
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
const handleConfirm = (val: Date) => {
  console.log(val);
  dateNote.value = formatDate(val);
};
const handleSelect = (val: Date) => {
  console.log(val);
};
</script>
<style lang="less">
@import '../../_common/style/mobile/_variables';

.is-holiday:not(.t-calendar__dates-item--selected) {
  color: @error-color-6;
}
</style>
