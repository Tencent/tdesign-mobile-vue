<template>
  <t-calendar v-model:visible="visible" :value="value" :format="format" :min-date="minDate" :max-date="maxDate" />
  <t-cell title="自定义文案" arrow @click="visible = true"></t-cell>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const minDate = new Date(2022, 1, 1);
const maxDate = new Date(2022, 2, 15);
const format = (day: any) => {
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
        day.prefix = map[curDate];
        day.suffix = '¥100';
        day.className = 'is-holiday';
      }
    }
  }

  return day;
};

const visible = ref(false);
const value = new Date(2022, 1, 15);
</script>

<style lang="less">
.is-holiday:not(.t-calendar__dates-item--selected) {
  color: #e34d59;
}
</style>
