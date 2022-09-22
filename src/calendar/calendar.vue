<template>
  <div>
    <t-popup v-model="popup" placement="bottom">
      <div :class="name">
        <div :class="`${name}__title`">
          <slot name="title">{{ title || '请选择日期' }}</slot>
        </div>
        <CloseIcon :class="`${name}__close-btn`" size="24" @click="popup = false" />
        <div :class="`${name}__days`">
          <div v-for="(item, index) in days" :key="index" :class="`${name}__days-item`">{{ item }}</div>
        </div>
        <div :class="`${name}__months`">
          <template v-for="(item, index) in months" :key="index">
            <div :class="`${name}__month`">{{ item.year }} 年 {{ item.month + 1 }} 月</div>
            <div :class="`${name}__dates`">
              <template v-for="(dateItem, dateIndex) in item.months" :key="dateIndex">
                <div
                  :class="{
                    [`${name}__dates-item`]: true,
                    [`${name}__dates-item--${dateItem.type}`]: !!dateItem.type,
                    [`${dateItem.classname ?? ''}`]: true,
                  }"
                  :style="{
                    marginLeft: dateIndex === 0 ? `${49 * item.weekdayOfFirstDay}px` : 0,
                  }"
                  @click="handleSelect(item.year, item.month, dateItem.day, dateItem)"
                >
                  <slot name="cell" :item="dateItem">
                    <div v-if="dateItem.prefix" :class="`${name}__dates-item-prefix`">{{ dateItem.prefix }}</div>
                    {{ dateItem.day }}
                    <div
                      v-if="dateItem.suffix"
                      :class="{
                        [`${name}__dates-item-suffix`]: true,
                        [`${name}__dates-item-suffix--${dateItem.type}`]: !!dateItem.type,
                      }"
                    >
                      {{ dateItem.suffix }}
                    </div>
                  </slot>
                </div>
              </template>
            </div>
          </template>
        </div>
        <div class="t-calendar__footer" @click="confirm">
          <t-button block :style="{ background: bgColor, color: '#fff' }">{{ confirmBtn }}</t-button>
        </div>
      </div>
    </t-popup>
  </div>
</template>

<script lang="ts">
import { defineEmits, defineProps, computed, watch, ref, onMounted } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';

import config from '../config';
import calendarProps from './props';
import type { CalendarCell, CalendarValue } from './type';

const { prefix } = config;
const name = `${prefix}-calendar`;

export default {
  name,
};
</script>

<script setup lang="ts">
const props = defineProps(calendarProps);
const emit = defineEmits(['select', 'confirm', 'update:modelValue']);

// 获取时间年月日起
const getYearMonthDay = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  };
};

const popup = ref<boolean>(props.visible);
const selectedDate = computed(() => {
  if (Array.isArray(props.value)) {
    return props.value.map((item) => new Date(item));
  }
  return props.value ? new Date(props.value) : new Date();
});
const type = computed(() => props.type);
const days = ref<string[]>(['日', '一', '二', '三', '四', '五', '六']);
const today = new Date();
const minDate = props.minDate ? new Date(props.minDate) : today;
const maxDate = props.maxDate
  ? new Date(props.maxDate)
  : new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

const dateValue = ref<CalendarValue>();

// 获取日期
const getDate = (year: number, month: number, day: number) => new Date(year, month, day);

// 选择日期
const handleSelect = (year: number, month: number, date: number, dateItem) => {
  if (dateItem.type === 'disabled') return;
  const selected = new Date(year, month, date);
  props.onSelect?.({ value: selected });
};
// 确认
const confirm = () => {
  popup.value = false;
  emit('confirm', dateValue.value);
};
const getMonthDates = (date: Date) => {
  const { year, month } = getYearMonthDay(date);
  const firstDay = getDate(year, month, 1);
  const weekdayOfFirstDay = firstDay.getDay();
  const lastDate = new Date(+getDate(year, month + 1, 1) - 24 * 3600).getDate();

  return {
    year,
    month,
    weekdayOfFirstDay,
    lastDate,
  };
};
const isSameDate = (date1, date2) => {
  if (date1 instanceof Date) date1 = getYearMonthDay(date1);
  if (date2 instanceof Date) date2 = getYearMonthDay(date2);
  const keys = ['year', 'month', 'date'];
  return keys.every((key) => date1[key] === date2[key]);
};

const months = computed(() => {
  const ans = [];
  let { year: minYear, month: minMonth } = getYearMonthDay(minDate);
  const { year: maxYear, month: maxMonth } = getYearMonthDay(maxDate);
  const calcType = (year: number, month: number, date: number) => {
    const curDate = new Date(year, month, date, 23, 59, 59);

    if (type.value === 'single') {
      if (isSameDate({ year, month, date }, selectedDate.value)) return 'selected';
    }
    if (type.value === 'range') {
      if (Array.isArray(selectedDate.value)) {
        const [startDate, endDate] = selectedDate.value;

        if (startDate && isSameDate({ year, month, date }, startDate)) return 'start';
        if (endDate && isSameDate({ year, month, date }, endDate)) return 'end';
        if (startDate && endDate && curDate.getTime() > startDate.getTime() && curDate.getTime() < endDate.getTime())
          return 'centre';
      }
    }

    if (curDate.getTime() < minDate.getTime() || curDate.getTime() > maxDate.getTime()) {
      return 'disabled';
    }
    return '';
  };

  while (minYear < maxYear || (minYear === maxYear && minMonth <= maxMonth)) {
    const target = getMonthDates(getDate(minYear, minMonth, 1));
    const months = [];
    for (let i = 1; i <= 31; i++) {
      if (i > target.lastDate) break;
      const dateObj = {
        date: getDate(minYear, minMonth, i),
        day: i,
        type: calcType(minYear, minMonth, i),
      };
      months.push(props.format ? props.format(dateObj) : dateObj);
    }
    ans.push({
      year: minYear,
      month: minMonth,
      months,
      weekdayOfFirstDay: target.weekdayOfFirstDay,
    });
    const curDate = getYearMonthDay(getDate(minYear, minMonth + 1, 1));
    minYear = curDate.year;
    minMonth = curDate.month;
  }

  return ans;
});

watch(
  () => props.visible,
  (val) => {
    popup.value = val;
  },
);
watch(
  () => popup.value,
  (val) => {
    emit('update:visible', val);
  },
);
</script>
