<template>
  <t-picker
    :class="className"
    :value="valueOfPicker"
    :title="title"
    :confirm-btn="confirmButtonText"
    :cancel-btn="cancelButtonText"
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    @pick="onPick"
  />
</template>

<script lang="ts">
import { ref, computed, defineComponent, toRefs, watch, nextTick } from 'vue';
import dayjs, { Dayjs, UnitType } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

import config from '../config';
import DateTimePickerProps from './props';
import { getMeaningColumn } from './shared';
import { useEmitEvent, useVModel } from '../shared';
import { Picker as TPicker } from '../picker';
import { PickerColumn, PickerColumnItem, PickerValue, PickerContext } from '../picker/type';

dayjs.extend(weekday);
dayjs.extend(customParseFormat);

const { prefix } = config;
const name = `${prefix}-date-time-picker`;

const precisionRankRecord: Record<string, number> = {
  year: 0,
  month: 1,
  date: 2,
  hour: 3,
  minute: 4,
  second: 5,
};

export default defineComponent({
  name,
  components: { TPicker },
  props: DateTimePickerProps,
  emits: ['change', 'cancel', 'confirm', 'pick', 'update:modelValue', 'update:value'],
  setup(props: any, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const className = computed(() => [`${name}`]);
    const { value, modelValue } = toRefs(props);
    const [innerValue, setDateTimePickerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const title = computed(() => {
      return props.title || '选择时间';
    });
    const confirmButtonText = computed(() => props.confirmBtn || '确定');
    const cancelButtonText = computed(() => props.cancelBtn || '取消');
    const normalize = (val: string | number, defaultDay: Dayjs) =>
      val && dayjs(val).isValid() ? dayjs(val) : defaultDay;
    const start = computed(() => normalize(props.start, dayjs().subtract(10, 'year')));
    const end = computed(() => normalize(props.end, dayjs().add(10, 'year')));

    const meaningColumn = computed(() => getMeaningColumn(props.mode));
    const isTimeMode = computed(
      () => isArray(props.mode) && props.mode[0] == null && ['hour', 'minute', 'second'].includes(props.mode[1]),
    );

    const rationalize = (val: Dayjs) => {
      if (isTimeMode.value) return val;
      if (val.isBefore(start.value)) return start.value;
      if (val.isAfter(end.value)) return end.value;
      return val;
    };

    const calcDate = (currentValue: string | number) => {
      if (isTimeMode.value) {
        const dateStr = dayjs(start.value).format('YYYY-MM-DD');
        currentValue = `${dateStr} ${currentValue}`;
      }

      return currentValue && dayjs(currentValue).isValid() ? rationalize(dayjs(currentValue)) : start.value;
    };
    const curDate = ref(calcDate(innerValue.value));

    const valueOfPicker = computed(() => meaningColumn.value.map((item) => curDate.value[item]().toString()));

    // 每次pick后，根据start,end生成最新的columns
    const columns = computed(() => {
      const ret: PickerColumn[] = [];
      const getDate = (date: Dayjs) => [
        date.year(),
        date.month() + 1,
        date.date(),
        date.hour(),
        date.minute(),
        date.second(),
      ];
      const [curYear, curMonth, curDay, curHour, curMinute] = getDate(curDate.value);
      const [minYear, minMonth, minDay, minHour, minMinute, minSecond] = getDate(start.value);
      const [maxYear, maxMonth, maxDay, maxHour, maxMinute, maxSecond] = getDate(end.value);

      const isInMinYear = curYear === minYear;
      const isInMaxYear = curYear === maxYear;
      const isInMinMonth = isInMinYear && curMonth === minMonth;
      const isInMaxMonth = isInMaxYear && curMonth === maxMonth;
      const isInMinDay = isInMinMonth && curDay === minDay;
      const isInMaxDay = isInMaxMonth && curDay === maxDay;
      const isInMinHour = isInMinDay && curHour === minHour;
      const isInMaxHour = isInMaxDay && curHour === maxHour;
      const isInMinMinute = isInMinHour && curMinute === minMinute;
      const isInMaxMinute = isInMaxHour && curMinute === maxMinute;

      const typeUnit = {
        year: '年',
        month: '月',
        date: '日',
        hour: '时',
        minute: '分',
        second: '秒',
      };

      const generateColumn = (start: number, end: number, type: string) => {
        const arr: PickerColumnItem[] = [];
        for (let i = start; i <= end; i++) {
          const value = i.toString();
          arr.push({
            label: props.renderLabel ? props.renderLabel(type, i) : `${value} ${typeUnit[type]}`,
            value: type === 'month' ? `${+value - 1}` : value,
          });
        }
        ret.push(arr);
      };

      if (meaningColumn.value.includes('year')) {
        generateColumn(minYear, maxYear, 'year');
      }

      if (meaningColumn.value.includes('month')) {
        const lower = isInMinYear ? minMonth : 1;
        const upper = isInMaxYear ? maxMonth : 12;
        generateColumn(lower, upper, 'month');
      }

      if (meaningColumn.value.includes('date')) {
        const lower = isInMinMonth ? minDay : 1;
        const upper = isInMaxMonth ? maxDay : dayjs(`${curYear}-${curMonth}`).daysInMonth();
        generateColumn(lower, upper, 'date');
      }

      if (meaningColumn.value.includes('hour')) {
        const lower = isInMinDay && !isTimeMode.value ? minHour : 0;
        const upper = isInMaxDay && !isTimeMode.value ? maxHour : 23;
        generateColumn(lower, upper, 'hour');
      }

      if (meaningColumn.value.includes('minute')) {
        const lower = isInMinHour && !isTimeMode.value ? minMinute : 0;
        const upper = isInMaxHour && !isTimeMode.value ? maxMinute : 59;
        generateColumn(lower, upper, 'minute');
      }

      if (meaningColumn.value.includes('second')) {
        const lower = isInMinMinute && !isTimeMode.value ? minSecond : 0;
        const upper = isInMaxMinute && !isTimeMode.value ? maxSecond : 59;
        generateColumn(lower, upper, 'second');
      }
      return ret;
    });

    const onConfirm = () => {
      emitEvent('confirm', dayjs(curDate.value).format(props.format));
      setDateTimePickerValue(dayjs(curDate.value).format(props.format));
    };

    const onCancel = (context: { e: MouseEvent }) => {
      emitEvent('cancel', { e: context.e });
    };

    const onPick = (value: Array<PickerValue>, context: PickerContext) => {
      const { column, index } = context;
      const type = meaningColumn.value[column];
      const val = curDate.value.set(type as UnitType, parseInt(columns.value[column][index]?.value, 10));

      curDate.value = rationalize(val);
      emitEvent('pick', rationalize(val).format(props.format));
    };

    watch(innerValue, (val) => {
      curDate.value = calcDate(val);
    });

    return {
      className,
      confirmButtonText,
      cancelButtonText,
      title,
      start,
      end,
      valueOfPicker,
      columns,
      onConfirm,
      onCancel,
      onPick,
    };
  },
});
</script>
