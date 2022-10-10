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
                    [`${dateItem.className ?? ''}`]: true,
                  }"
                  :style="{
                    marginLeft: dateIndex === 0 ? `${49 * ((item.weekdayOfFirstDay - firstDayOfWeek + 7) % 7)}px` : 0,
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
        <div class="t-calendar__footer">
          <slot name="confirmBtn">
            <template v-if="confirmBtn">
              <t-button block theme="primary" v-bind="confirmBtn" @click="handleConfirm" />
            </template>
          </slot>
        </div>
      </div>
    </t-popup>
  </div>
</template>

<script lang="ts">
import { defineEmits, defineProps, computed, watch, ref, toRaw } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';

import config from '../config';
import calendarProps from './props';
import { TDate, TDateType } from './type';

const { prefix } = config;
const name = `${prefix}-calendar`;

export default {
  name,
};
</script>

<script setup lang="ts">
const props = defineProps(calendarProps);
const emit = defineEmits(['select', 'confirm', 'update:modelValue', 'update:value', 'update:visible']);

// 获取时间年月日起
const getYearMonthDay = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  };
};

const popup = ref<boolean>(props.visible);
const valueRef = ref(props.value);
const selectedDate = ref();
const firstDayOfWeek = computed(() => props.firstDayOfWeek);
const type = computed(() => props.type);
const days = computed(() => {
  const raw = '日一二三四五六';
  const ans = [];
  let i = firstDayOfWeek.value % 7;

  while (ans.length < 7) {
    ans.push(raw[i]);
    i = (i + 1) % 7;
  }

  return ans;
});
const today = new Date();
const minDate = props.minDate ? new Date(props.minDate) : today;
const maxDate = props.maxDate
  ? new Date(props.maxDate)
  : new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

// 获取日期
const getDate = (year: number, month: number, day: number) => new Date(year, month, day);

// 选择日期
const handleSelect = (year: number, month: number, date: number, dateItem: TDate) => {
  if (dateItem.type === 'disabled') return;
  const selected = new Date(year, month, date);

  if (type.value === 'range' && Array.isArray(selectedDate.value)) {
    if (selectedDate.value.length === 1) {
      if (selectedDate.value[0] > selected) {
        selectedDate.value = [selected];
      } else {
        selectedDate.value = [selectedDate.value[0], selected];
      }
    } else {
      selectedDate.value = [selected];
    }
  } else if (props.type === 'multiple') {
    const newVal = [...selectedDate.value];
    const index = selectedDate.value.findIndex((item: Date) => isSameDate(item, selected));
    if (index > -1) {
      newVal.splice(index, 1);
    } else {
      newVal.push(selected);
    }
    selectedDate.value = newVal;
  } else {
    selectedDate.value = selected;
  }
  props.onSelect?.(toRaw(selectedDate.value));
};
// 确认
const handleConfirm = () => {
  popup.value = false;
  props.onConfirm?.(toRaw(selectedDate.value));
};
const getMonthDates = (date: Date) => {
  const { year, month } = getYearMonthDay(date);
  const firstDay = getDate(year, month, 1);
  const weekdayOfFirstDay = firstDay.getDay();
  const lastDate = new Date(+getDate(year, month + 1, 1) - 24 * 3600 * 1000).getDate();

  return {
    year,
    month,
    weekdayOfFirstDay,
    lastDate,
  };
};
type CompareDate = Date | number | { year: number; month: number; date: number };
const isSameDate = (date1: CompareDate, date2: CompareDate) => {
  if (date1 instanceof Date) date1 = getYearMonthDay(date1);
  if (date2 instanceof Date) date2 = getYearMonthDay(date2);
  const keys = ['year', 'month', 'date'];
  return keys.every((key) => date1[key] === date2[key]);
};

const months = computed(() => {
  const ans = [];
  let { year: minYear, month: minMonth } = getYearMonthDay(minDate);
  const { year: maxYear, month: maxMonth } = getYearMonthDay(maxDate);
  const calcType = (year: number, month: number, date: number): TDateType => {
    const curDate = new Date(year, month, date, 23, 59, 59);

    if (type.value === 'single') {
      if (isSameDate({ year, month, date }, selectedDate.value)) return 'selected';
    }
    if (type.value === 'multiple') {
      const hit = selectedDate.value.some((item: Date) => isSameDate({ year, month, date }, item));
      if (hit) {
        return 'selected';
      }
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

    const minCurDate = new Date(year, month, date, 0, 0, 0);
    if (curDate.getTime() < minDate.getTime() || minCurDate.getTime() > maxDate.getTime()) {
      return 'disabled';
    }
    return '';
  };

  while (minYear < maxYear || (minYear === maxYear && minMonth <= maxMonth)) {
    const target = getMonthDates(getDate(minYear, minMonth, 1));
    const months: TDate[] = [];
    for (let i = 1; i <= 31; i++) {
      if (i > target.lastDate) break;
      const dateObj: TDate = {
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

const confirmBtn = computed(() => {
  if (props.confirmBtn === 'string' || props.confirmBtn === '') return { content: props.confirmBtn || '确认' };
  return props.confirmBtn;
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

watch(
  valueRef,
  () => {
    if (Array.isArray(valueRef.value)) {
      selectedDate.value = valueRef.value.map((item) => new Date(item));
    } else if (valueRef.value) {
      selectedDate.value = new Date(valueRef.value);
    } else {
      selectedDate.value = props.type === 'multiple' ? [new Date()] : new Date();
    }
  },
  { immediate: true },
);
</script>
