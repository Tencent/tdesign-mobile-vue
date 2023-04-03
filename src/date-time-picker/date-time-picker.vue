<template>
  <div :class="className">
    <t-picker
      :value="pickerValue"
      :title="title"
      :confirm-btn="confirmButtonText"
      :cancel-btn="cancelButtonText"
      :columns="columns"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
      @pick="onPick"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, toRefs, watch, nextTick } from 'vue';
import dayjs, { Dayjs, UnitType } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isObject from 'lodash/isObject';
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
    const [dateTimePickerValue, setDateTimePickerValue] = useVModel(
      value,
      modelValue,
      props.defaultValue,
      props.onChange,
    );
    const innerValue = ref(dateTimePickerValue.value);
    const title = computed(() => {
      return props.title || '选择时间';
    });
    const confirmButtonText = computed(() => props.confirmBtn || '确定');
    const cancelButtonText = computed(() => props.cancelBtn || '取消');

    const start = computed(() => {
      return props.start ? dayjs(props.start) : dayjs().subtract(10, 'year');
    });

    const end = computed(() => {
      return props.end ? dayjs(props.end) : dayjs().add(10, 'year');
    });

    const meaningColumn = computed(() => getMeaningColumn(props.mode));

    // 根据mode，判断是否需要渲染'year','month','date','hour','minute','second'对应的列
    const isPrecision = (type: string) => {
      if (!props.mode) {
        return false;
      }

      if (type in precisionRankRecord) {
        return (
          (isString(props.mode) && precisionRankRecord[props.mode] >= precisionRankRecord[type]) ||
          (isObject(props.mode) && precisionRankRecord[props.mode[0]] >= precisionRankRecord[type])
        );
      }

      return true;
    };

    // 将dateTimeValue格式的值转为pickerValue，赋值给picker组件的value
    const getPickerValueByDateTimePickerValue = (currentDate: Dayjs) => {
      const ret: PickerValue[] = [];
      Object.keys(precisionRankRecord).forEach((item) => {
        if (isPrecision(item)) {
          ret.push(`${currentDate[item]()}`);
        }
      });
      return ret;
    };

    const curDate = ref(
      (() => {
        const timeMode = ['hour', 'minute', 'second'];
        if (timeMode.includes(props.mode) || (isArray(props.mode) && props.mode?.[0] == null)) {
          return dayjs(`1900-1-1 ${innerValue.value}`);
        }
        return dayjs(innerValue.value);
      })(),
    );

    const rationalize = (val: Dayjs) => {
      if (val.isBefore(start.value)) return start.value;
      if (val.isAfter(end.value)) return end.value;
      return val;
    };

    const pickerValue = computed(() => getPickerValueByDateTimePickerValue(curDate.value));

    // 每次pick后，根据start,end生成最新的columns
    const columns = computed(() => {
      const ret: PickerColumn[] = [];
      const getDate = (date: Dayjs) => [date.year(), date.month() + 1, date.date(), date.minute(), date.second()];
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

      if (isPrecision('year')) {
        generateColumn(minYear, maxYear, 'year');
      }

      if (isPrecision('month')) {
        const lower = isInMinYear ? minMonth : 1;
        const upper = isInMaxYear ? maxMonth : 12;
        generateColumn(lower, upper, 'month');
      }

      if (isPrecision('date')) {
        const lower = isInMinMonth ? minDay : 1;
        const upper = isInMaxMonth ? maxDay : dayjs(`${curYear}-${curMonth}`).daysInMonth();
        generateColumn(lower, upper, 'date');
      }

      if (isPrecision('hour')) {
        const lower = isInMinDay ? minHour : 0;
        const upper = isInMaxDay ? maxHour : 23;
        generateColumn(lower, upper, 'hour');
      }

      if (isPrecision('minute')) {
        const lower = isInMinHour ? minMinute : 0;
        const upper = isInMaxHour ? maxMinute : 59;
        generateColumn(lower, upper, 'minute');
      }

      if (isPrecision('second')) {
        const lower = isInMinMinute ? minSecond : 0;
        const upper = isInMaxMinute ? maxSecond : 59;
        generateColumn(lower, upper, 'second');
      }
      return ret;
    });

    const onConfirm = (value: Array<PickerValue>, context: { index: number[] }) => {
      emitEvent('confirm', dayjs(curDate.value).format(props.format));
    };

    const onCancel = (context: { e: MouseEvent }) => {
      emitEvent('cancel', { e: context.e });
    };

    const onChange = (value: Array<PickerValue>, context: { columns: Array<PickerContext>; e: MouseEvent }) => {
      emitEvent('change', dayjs(curDate.value).format(props.format));
    };

    const onPick = (value: Array<PickerValue>, context: PickerContext) => {
      const { column, index } = context;
      const type = meaningColumn.value[column];
      const val = curDate.value.set(type as UnitType, parseInt(columns.value[column][index]?.value, 10));

      curDate.value = rationalize(val);
      emitEvent('pick', val.format(props.format));
    };

    return {
      className,
      confirmButtonText,
      cancelButtonText,
      title,
      start,
      end,
      pickerValue,
      columns,
      onConfirm,
      onCancel,
      onPick,
      onChange,
    };
  },
});
</script>
