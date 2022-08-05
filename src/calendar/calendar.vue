<template>
  <div>
    <t-popup v-model="flag" placement="bottom">
      <div class="cc-calendar">
      <div class="cc-calendar-title" v-if="$slots.head">
        <slot name="head"></slot>
      </div>
      <div class="cc-calendar-text">
        <div class="cc-calendar-text-year" @click="preYear">
          <ChevronLeftIcon size="10" />
          <ChevronLeftIcon size="10" style="position: relative;right: 6px;" />
        </div>
        <div class="cc-calendar-text-month" @click="preMonth">
          <ChevronLeftIcon size="10" />
        </div>
        <div class="cc-calendar-text-current">{{ time.year }}年{{ time.month + 1 }}月</div>
        <div class="cc-calendar-text-month" @click="nextMonth">
          <ChevronRightIcon size="10" />
        </div>
        <div class="cc-calendar-text-year" @click="nextYear">
         <ChevronRightIcon size="10" />
         <ChevronRightIcon size="10" style="position: relative;left: -6px;" />
        </div>
      </div>
      <div class="cc-calendar-days">
        <div class="cc-calendar-days-item" v-for="(item, index) in days" :key="index">{{ item }}</div>
      </div>
      <div class="cc-calendar-content">
        <div class="cc-calendar-content-item" v-for="i in 6" :key="i">
          <div class="cc-calendar-content-item-text" v-for="j in 7" :key="j">
            <div
              v-if="showDays[(i - 1) * 7 + (j - 1)]"
              @click="chooseDay(showDays[(i - 1) * 7 + (j - 1)])"
              :key="j"
              class="cc-calendar-content-item-text-value"
              :class="{
                'cc-calendar-content-item-text-nocurrent': !isCurrentMonth(showDays[(i - 1) * 7 + (j - 1)]),
                'cc-calendar-content-item-text-today': isToday(showDays[(i - 1) * 7 + (j - 1)])
              }"
              :style="{ background: isToday(showDays[(i - 1) * 7 + (j - 1)]) ? bgColor : '#fff', color: isToday(showDays[(i - 1) * 7 + (j - 1)]) ? '#fff' : '#303133' }"
            >
              <slot name="cell" :item="showDays[(i - 1) * 7 + (j - 1)].getDate()">
                <div>{{ showDays[(i - 1) * 7 + (j - 1)].getDate() }}</div>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div class="cc-calendar-btn" @click="confirm">
        <t-button block :style="{background: bgColor, color: '#fff'}">{{ confirmBtn }}</t-button>
      </div>
    </div>
    </t-popup>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, watch, ref, onMounted } from 'vue';
import props from './props';
import config from '../config';
import { ChevronRightIcon, ChevronLeftIcon } from 'tdesign-icons-vue-next';

const { prefix } = config;
const name = `${prefix}-calendar`;


export default defineComponent({
  name: 't-calendar',
  props: props,
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
  },
  emits: ['cell-click', 'confirm', 'update:modelValue'],
  setup(props, {emit}) {
    // 获取时间年月日起
    const getYearMonthDay = (date: any) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return {
        year,
        month,
        day
      }
    }
    // 显示弹框
    const flag = ref<boolean>(props.modelValue)
    // 当前选中日期 默认今天
    const value = ref<any>(props.value)
    // 当前日期
    const days = ref<string[]>(['日', '一', '二', '三', '四', '五', '六'])

    // 选择的时间
    const time = ref<any>({ year: getYearMonthDay(new Date()).year, month: getYearMonthDay(new Date()).month })
    const dateValue = ref<any>(null)

    // 获取日期
    const getDate = (year: number, month: number, day: number) => {
      return new Date(year, month, day)
    }
    // 判断是否是当前月份
    const isCurrentMonth = (date: any) => {
      const { year, month } = getYearMonthDay(date)
      const { year: y, month: m } = getYearMonthDay(getDate(time.value.year, time.value.month, 1))
      return year === y && month === m
    }
    // 判断是否是今天
    const isToday = (date: any) => {
      const { year, month, day } = getYearMonthDay(value.value)
      const { year: y, month: m, day: d } = getYearMonthDay(date)
      return year === y && month === m && day === d
    }
    // 上一年
    const preYear = () => {
      time.value.year--
    }
    // 下一年
    const nextYear = () => {
      time.value.year++
    }
    // 上一月
    const preMonth = () => {
      const d = getDate(time.value.year, time.value.month, 1)
      d.setMonth(d.getMonth() - 1)
      time.value = getYearMonthDay(d)
    }
    // 下一月
    const nextMonth = () => {
      const d = getDate(time.value.year, time.value.month, 1)
      d.setMonth(d.getMonth() + 1)
      time.value = getYearMonthDay(d)
    }
    // 选择日期
    const chooseDay = (item: any) => {
      if (!props.range) {
        value.value = item
        const { year, month, day } = getYearMonthDay(item)
        emit('cell-click', {
          year,
          month: month + 1,
          day
        })
        const isToday = year === new Date().getFullYear() && month === new Date().getMonth() && day === new Date().getDate() ? true : false
        dateValue.value = {
          year,
          month: month + 1,
          day,
          week: item.getDay(),
          date: year + '-' + (month + 1) + '-' + day,
          isToday
        }
      } else {
        // 多选日期
      }
    }
    // 确认
    const confirm = () => {
      emit('confirm', dateValue.value)
    }
        // 格式化时间
    const formatDate = computed(() => {
      const { year, month, day } = getYearMonthDay(value.value)
      return `${year}-${month + 1}-${day}`
    })
    const showDays = computed(() => {
      const { year, month, day } = getYearMonthDay(getDate(time.value.year, time.value.month, 1))
      // 获取当月第一天
      const firstDay: any = getDate(year, month, 1)
      // 获取当月第一天是星期几
      const week = firstDay.getDay()
      // 开始日期
      const startDay = firstDay - week * 1000 * 60 * 60 * 24
      let arr = []
      // 循环42天 因为日历是6 * 7的布局
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 1000 * 60 * 60 * 24))
      }
      return arr
    })
    watch(() => props.modelValue, val => {
      flag.value = val
    })
    watch(() => flag.value, val => {
      emit('update:modelValue', val)
    })
    onMounted(() => {
      time.value.year = getYearMonthDay(value.value).year
      time.value.month = getYearMonthDay(value.value).month
      dateValue.value = {
          year: getYearMonthDay(value.value).year,
          month: getYearMonthDay(value.value).month + 1,
          day: value.value.getDate(),
          week: value.value.getDay(),
          date: getYearMonthDay(value.value).year + '-' + (Number(getYearMonthDay(value.value).month) + 1) + '-' + value.value.getDate(),
          isToday: isToday(value.value)
        }
    })
    return {
      name,
      ...toRefs(props),
      getYearMonthDay,
      flag,
      value,
      days,
      time,
      dateValue,
      close,
      getDate,
      isCurrentMonth,
      isToday,
      preYear,
      nextYear,
      preMonth,
      nextMonth,
      chooseDay,
      confirm,
      formatDate,
      showDays
    };
  },
});
</script>
