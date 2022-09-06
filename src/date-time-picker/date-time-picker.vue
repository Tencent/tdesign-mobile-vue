<template>
  <div :class="className">
    <t-picker
      ref="pickeInstance"
      :value="currentPicker"
      :title="title"
      :columns="(selected) => generateDatePickerColumns(selected, start, end, renderLabel)"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
      @pick="onPick"
    >
    </t-picker>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, SetupContext, toRefs, watch, nextTick } from 'vue';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import config from '../config';
import DateTimePickerProps from './props';
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
  setup(props: any, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const pickeInstance = ref<any>(null);
    const isChanged = ref(false);
    const realDateValue = ref();
    const className = computed(() => [`${name}`]);
    const { value, modelValue } = toRefs(props);
    const [dateTimePickerValue, setDateTimePickerValue] = useVModel(
      value,
      modelValue,
      props.defaultValue,
      props.onChange,
    );
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

    const renderLabel = computed(() => {
      return props.renderLabel;
    });

    // 根据mode，判断是否需要渲染'year','month','date','hour','minute','second'对应的列
    const isPrecision = (type: string) => {
      if (!props.mode) {
        return false;
      }
      switch (type) {
        case 'year':
          return (
            (typeof props.mode === 'string' && precisionRankRecord[props.mode] >= 0) ||
            (typeof props.mode === 'object' && precisionRankRecord[props.mode[0]] >= 0)
          );
        case 'month':
          return (
            (typeof props.mode === 'string' && precisionRankRecord[props.mode] >= 1) ||
            (typeof props.mode === 'object' && precisionRankRecord[props.mode[0]] >= 1)
          );
        case 'date':
          return (
            (typeof props.mode === 'string' && precisionRankRecord[props.mode] >= 2) ||
            (typeof props.mode === 'object' && precisionRankRecord[props.mode[0]] >= 2)
          );
        case 'hour':
          return (
            (typeof props.mode === 'string' && precisionRankRecord[props.mode] >= 3) ||
            (typeof props.mode === 'object' && precisionRankRecord[props.mode[1]] >= 3)
          );
        case 'minute':
          return (
            (typeof props.mode === 'string' && precisionRankRecord[props.mode] >= 4) ||
            (typeof props.mode === 'object' && precisionRankRecord[props.mode[1]] >= 4)
          );
        case 'second':
          return (
            (typeof props.mode === 'string' && precisionRankRecord[props.mode] >= 5) ||
            (typeof props.mode === 'object' && precisionRankRecord[props.mode[1]] >= 5)
          );
        default:
          return true;
      }
    };

    // 将dateTimeValue格式的值转为pickerValue，赋值给picker组件的value
    const getPickerValueByDateTimePickerValue = (value: string | number) => {
      const currentDate = dayjs(value);
      const ret: PickerValue[] = [];
      Object.keys(precisionRankRecord).forEach((item) => {
        if (isPrecision(item)) {
          ret.push(`${currentDate[item]()}`);
        }
      });
      return ret;
    };

    // 当默认v-model为空时，当前value取最小日期
    const pickerValue = ref(getPickerValueByDateTimePickerValue(dateTimePickerValue.value || start.value.valueOf()));

    let lastTimePicker = [...pickerValue.value];
    let currentPicker = [...pickerValue.value];

    // 将pickerValue格式的值转为dateTimeValue，用于触发事件时进行输出
    const getDateTimePickerValueByPickerValue = (value: PickerValue[]) => {
      let valueLength = 0;
      let date = dayjs();
      Object.keys(precisionRankRecord).forEach((item, index) => {
        if (isPrecision(item)) {
          date = date[item](value[valueLength]);
          valueLength++;
        }
      });
      return date;
    };

    // 每次pick后，根据start,end生成最新的columns
    const generateDatePickerColumns = (
      selected: PickerValue[],
      min: any,
      max: any,
      renderLabel: (type: string, value: number) => string,
    ) => {
      const ret: PickerColumn[] = [];
      const minYear = min.year();
      const minMonth = min.month() + 1;
      const minDay = min.date();
      const minHour = min.hour();
      const minMinute = min.minute();
      const minSecond = min.second();

      const maxYear = max.year();
      const maxMonth = max.month() + 1;
      const maxDay = max.date();
      const maxHour = max.hour();
      const maxMinute = max.minute();
      const maxSecond = max.second();

      const selectedDate: any = {};
      let selectedLength = 0;

      Object.keys(precisionRankRecord).forEach((item) => {
        const newKey = `selected${item.substr(0, 1).toUpperCase()}${item.substr(1, item.length)}`;
        if (isPrecision(item)) {
          selectedDate[newKey] = parseInt(`${selected[selectedLength]}`, 10);
          selectedLength++;
        } else {
          selectedDate[newKey] = undefined;
        }
      });

      const isInMinYear = selectedDate.selectedYear === minYear;
      const isInMaxYear = selectedDate.selectedYear === maxYear;
      const isInMinMonth = isInMinYear && selectedDate.selectedMonth + 1 === minMonth;
      const isInMaxMonth = isInMaxYear && selectedDate.selectedMonth + 1 === maxMonth;
      const isInMinDay = isInMinMonth && selectedDate.selectedDay === minDay;
      const isInMaxDay = isInMaxMonth && selectedDate.selectedDay === maxDay;
      const isInMinHour = isInMinDay && selectedDate.selectedHour === minHour;
      const isInMaxHour = isInMaxDay && selectedDate.selectedHour === maxHour;
      const isInMinMinute = isInMinHour && selectedDate.selectedMinute === minMinute;
      const isInMaxMinute = isInMaxHour && selectedDate.selectedMinute === maxMinute;

      const generateColumn = (start: number, end: number, type: string) => {
        const arr: PickerColumnItem[] = [];
        for (let i = start; i <= end; i++) {
          const value = i.toString();
          arr.push({
            label: renderLabel ? renderLabel(type, i) : value,
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
        const upper = isInMaxMonth ? maxDay : dayjs(`${selected[0]}-${+selected[1] + 1}`).daysInMonth();
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
    };

    const onConfirm = (value: Array<PickerValue>, context: { index: number[] }) => {
      lastTimePicker = [...currentPicker];
      const currentDate = getDateTimePickerValueByPickerValue(value);
      emitEvent('confirm', dayjs(currentDate).format(props.format));
    };

    const onCancel = (context: { e: MouseEvent }) => {
      currentPicker = [...lastTimePicker];
      emitEvent('cancel', { e: context.e });
    };

    const onChange = (value: Array<PickerValue>, context: { columns: Array<PickerContext>; e: MouseEvent }) => {
      lastTimePicker = [...currentPicker];
      const currentDate = getDateTimePickerValueByPickerValue(value);
      realDateValue.value = dayjs(currentDate).format(props.format);
      isChanged.value = true;
    };

    const onPick = (value: Array<PickerValue>, context: PickerContext) => {
      currentPicker = value;
      const currentDate = getDateTimePickerValueByPickerValue(value);
      emitEvent('pick', dayjs(currentDate).format(props.format));
    };

    /**
     * 监听v-model变化，当modelValue发生变化时，更新数据和ui
     * isChanged用来区分用户直接修改v-model，和滑动picker修改value两种方式
     * 只有用户滑动picker时，isChanged为true，滑动结束后设为false
     */
    watch(
      () => dateTimePickerValue,
      (val) => {
        nextTick(() => {
          if (isChanged.value) {
            isChanged.value = false;
          } else {
            pickeInstance.value?.setValues(getPickerValueByDateTimePickerValue(val.value || start.value.valueOf()));
            currentPicker = [...ref(getPickerValueByDateTimePickerValue(val.value || start.value.valueOf())).value];
            lastTimePicker = [...currentPicker];
            isChanged.value = false;
          }
        });
      },
      {
        immediate: true,
        deep: true,
      },
    );

    watch(
      () => isChanged,
      (val) => {
        if (val.value) {
          setDateTimePickerValue(realDateValue.value);
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    return {
      pickeInstance,
      className,
      confirmButtonText,
      cancelButtonText,
      title,
      start,
      end,
      renderLabel,
      pickerValue,
      currentPicker,
      realDateValue,
      isChanged,
      generateDatePickerColumns,
      onConfirm,
      onCancel,
      onPick,
      onChange,
    };
  },
});
</script>
