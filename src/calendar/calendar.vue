<template>
  <div>
    <t-popup v-model="popup" placement="bottom">
      <div :class="name">
        <div v-if="$slots.title || title" :class="`${name}__title`">
          <slot name="title">{{ title }}</slot>
        </div>
        <CloseIcon :class="`${name}__close-btn`" size="24" @click="popup = false" />
        <div :class="`${name}__days`">
          <div v-for="(item, index) in days" :key="index" :class="`${name}__days-item`">{{ item }}</div>
        </div>
        <div :class="`${name}__months`">
          <template v-for="(item, index) in months" :key="index">
            <div :class="`${name}__month`">{{ item.year }} 年 {{ item.month + 1 }} 月</div>
            <div :class="`${name}__dates`">
              <template v-for="i in 31" :key="i">
                <div
                  v-if="i <= item.lastDate"
                  :class="{
                    [`${name}__dates-item`]: true,
                    [`${name}__dates-item--active`]:
                      activeDate.year === item.year && activeDate.month === item.month && activeDate.day === i,
                  }"
                  :style="{
                    marginLeft: i === 1 ? `${49 * item.weekdayOfFirstDay}px` : 0,
                  }"
                  @click="handleSelect(item.year, item.month, i)"
                >
                  <slot name="cell" :item="{}">
                    <div>{{ i }}</div>
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
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return {
    year,
    month,
    day,
  };
};

const popup = ref<boolean>(props.modelValue);
const value = ref<Date>(props.value as Date);
const days = ref<string[]>(['日', '一', '二', '三', '四', '五', '六']);
const today = new Date();
const minDate = props.minDate ? new Date(props.minDate) : today;
const maxDate = new Date(props.maxDate ?? today.getFullYear(), today.getMonth() + 6, today.getDate());

const activeDate = computed(() => getYearMonthDay(value.value));

// 选择的时间
const time = ref<CalendarCell>({
  year: getYearMonthDay(new Date()).year,
  month: getYearMonthDay(new Date()).month,
  day: getYearMonthDay(new Date()).day,
});
const dateValue = ref<CalendarValue>();

// 获取日期
const getDate = (year: number, month: number, day: number) => new Date(year, month, day);

// 判断是否是今天
const isToday = (date: Date) => {
  const { year, month, day } = getYearMonthDay(value.value);
  const { year: y, month: m, day: d } = getYearMonthDay(date);
  return year === y && month === m && day === d;
};

// 选择日期
const handleSelect = (year: number, month: number, date: number) => {
  const selected = new Date(year, month, date);
  props.onSelect?.(selected);
  value.value = selected;
};
// 确认
const confirm = () => {
  popup.value = false;
  emit('confirm', dateValue.value);
};
// 格式化时间
const formatDate = computed(() => {
  const { year, month, day } = getYearMonthDay(value.value);
  return `${year}-${month + 1}-${day}`;
});
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
const months = computed(() => {
  const ans = [];
  let { year: minYear, month: minMonth } = getYearMonthDay(minDate);
  const { year: maxYear, month: maxMonth } = getYearMonthDay(maxDate);

  while (minYear < maxYear || (minYear === maxYear && minMonth < maxMonth)) {
    ans.push(getMonthDates(getDate(minYear, minMonth, 1)));
    const curDate = getYearMonthDay(getDate(minYear, minMonth + 1, 1));
    minYear = curDate.year;
    minMonth = curDate.month;
  }

  return ans;
});

watch(
  () => props.modelValue,
  (val) => {
    popup.value = val;
  },
);
watch(
  () => popup.value,
  (val) => {
    emit('update:modelValue', val);
  },
);

onMounted(() => {
  time.value.year = getYearMonthDay(value.value).year;
  time.value.month = getYearMonthDay(value.value).month;
  dateValue.value = {
    year: getYearMonthDay(value.value).year,
    month: getYearMonthDay(value.value).month + 1,
    day: value.value.getDate(),
    week: value.value.getDay(),
    date: `${getYearMonthDay(value.value).year}-${
      Number(getYearMonthDay(value.value).month) + 1
    }-${value.value.getDate()}`,
    isToday: isToday(value.value),
  };
});
</script>
