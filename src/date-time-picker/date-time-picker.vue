<template>
  <div :class="className">
    <t-picker
      :default-value="data.pickerValue"
      :value="data.pickerValue"
      :title="title"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <t-picker-item
        v-if="pickerColumns.includes('year')"
        :options="yearOptions"
        :formatter="(val) => `${val}年`"
        @change="onColumnChange"
      />
      <t-picker-item
        v-if="pickerColumns.includes('month')"
        :options="monthOptions"
        :formatter="(val) => `${val + 1}月`"
        @change="onColumnChange"
      />
      <t-picker-item
        v-if="pickerColumns.includes('date')"
        :options="dateOptions"
        :formatter="(val) => `${val}日${showWeek ? getWeekdayText(val) : ''}`"
        @change="onColumnChange"
      />
      <t-picker-item
        v-if="pickerColumns.includes('hour')"
        :options="hourOptions"
        :formatter="(val) => `${val}时`"
        @change="onColumnChange"
      />
      <t-picker-item
        v-if="pickerColumns.includes('minute')"
        :options="minuteOptions"
        :formatter="(val) => `${val}分`"
        @change="onColumnChange"
      />
      <t-picker-item
        v-if="pickerColumns.includes('second')"
        :options="secondOptions"
        :formatter="(val) => `${val}秒`"
        @change="onColumnChange"
      />
    </t-picker>
  </div>
</template>

<script lang="ts">
import { ref, reactive, watchEffect, computed, defineComponent, ComputedRef } from 'vue';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEmitEvent, useDefault } from '../shared';
import config from '../config';
import DateTimePickerProps from './props';
import { DateValue, TimeModeValues, DisableDateObj, TdDateTimePickerProps } from './type';

dayjs.extend(weekday);
dayjs.extend(customParseFormat);

const { prefix } = config;
const name = `${prefix}-date-time-picker`;
const DATE_MODES: Array<TimeModeValues> = ['year', 'month', 'date'];
const TIME_MODES: Array<TimeModeValues> = ['hour', 'minute', 'second'];
const ALL_MODES = [...DATE_MODES, ...TIME_MODES];

export default defineComponent({
  name,
  props: DateTimePickerProps,
  emits: ['change', 'update:value', 'update:modelValue', 'cancel', 'confirm', 'columnChange'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const [innerValue] = useDefault<DateValue, TdDateTimePickerProps>(props, context.emit, 'value', 'change');
    const className = computed(() => [`${name}`]);

    // 根据props.mode判断展示哪些列
    const pickerColumns: ComputedRef<TimeModeValues[]> = computed(() => {
      const dateModes = [...DATE_MODES];
      const timeModes = [...TIME_MODES];
      [dateModes, timeModes].forEach((modes) => {
        [...modes].reverse().every((mode) => {
          if (props.mode instanceof Array) {
            if (!props.mode.includes(mode)) {
              modes.pop();
              return true;
            }
            return false;
          }
          if (props.mode !== mode) {
            modes.pop();
            return true;
          }
          return false;
        });
      });
      return [...dateModes, ...timeModes];
    });

    // 根据mode参数推断出的format，优先级低于format参数
    const modeFormat = computed(() => {
      let formatDate = '';
      let formatTime = '';

      if (pickerColumns.value.includes('year')) {
        formatDate = 'YYYY';
      }
      if (pickerColumns.value.includes('month')) {
        formatDate = 'YYYY-MM';
      }
      if (pickerColumns.value.includes('date')) {
        formatDate = 'YYYY-MM-DD';
      }

      if (pickerColumns.value.includes('hour')) {
        formatTime = 'HH';
      }
      if (pickerColumns.value.includes('minute')) {
        formatTime = 'HH:mm';
      }
      if (pickerColumns.value.includes('second')) {
        formatTime = 'HH:mm:ss';
      }
      return `${formatDate} ${formatTime}`.trim();
    });

    const defaultPickerValue = computed(() => {
      const dayjsValueDefault = dayjs();

      const formats = [props.format, modeFormat.value];
      const dayjsValueProps = dayjs(innerValue.value as any, formats, 'es', true);
      const value = pickerColumns.value.map((mode) => {
        let v = dayjsValueProps[mode]();
        if (v === undefined || v == null || isNaN(v)) {
          v = dayjsValueDefault[mode]();
        }
        return v;
      });
      return value;
    });

    const defaultModeValue = computed(() => {
      const dayjsValueDefault = dayjs();
      const dayjsValueProps = dayjs(innerValue.value as any);
      const value: Record<TimeModeValues, number> = Object.create({});

      ALL_MODES.forEach((mode) => {
        value[mode] = dayjsValueDefault[mode]();
      });
      pickerColumns.value.forEach((mode) => {
        value[mode] = dayjsValueProps[mode]();
      });
      return value;
    });

    // 数据
    const data = reactive({
      pickerValue: defaultPickerValue.value,

      // 为了简化代码，增加了下列冗余的取值属性，其值与pickerValue同步更新。
      // TODO:
      year: defaultModeValue.value.year,
      month: defaultModeValue.value.month,
      date: defaultModeValue.value.date,
      hour: defaultModeValue.value.hour,
      minute: defaultModeValue.value.minute,
      second: defaultModeValue.value.second,
    });

    const currentYear = ref(defaultModeValue.value.year);
    watchEffect(() => {
      currentYear.value = data.year;
    });

    // 标题
    const title = computed(() => {
      if (props.title !== undefined) {
        return props.title;
      }

      let str = '选择';
      if (
        pickerColumns.value.includes('year') ||
        pickerColumns.value.includes('month') ||
        pickerColumns.value.includes('date')
      ) {
        str += '日期';
      }
      if (
        pickerColumns.value.includes('hour') ||
        pickerColumns.value.includes('minute') ||
        pickerColumns.value.includes('second')
      ) {
        str += '时间';
      }
      return str;
    });

    const confirmButtonText = computed(() => props.confirmBtn || '确定');
    const cancelButtonText = computed(() => props.cancelBtn || '取消');

    const isAvailable = (...args) => {
      if (!props.disableDate) {
        return true;
      }
      if (args.length === 0) {
        return false;
      }

      const [year = dayjs().year(), month = 0, date = 1, hour = 0, minute = 0, second = 0] = args;
      const mode = ALL_MODES[args.length - 1];
      const value = dayjs().year(year).month(month).date(date).hour(hour).minute(minute).second(second);

      const conditionFunction =
        typeof props.disableDate === 'function' ? !props.disableDate(getOutputValue(value)) : true;
      const conditionArray =
        props.disableDate instanceof Array ? props.disableDate.every((item) => !value.isSame(dayjs(item), mode)) : true;

      const disabledDateObj = props.disableDate as DisableDateObj;

      let conditionFromAndTo = true;

      if (disabledDateObj?.from && disabledDateObj?.to) {
        conditionFromAndTo =
          value.isBefore(dayjs(disabledDateObj?.from), mode) || !value.isAfter(dayjs(disabledDateObj?.to), mode);
      } else if (disabledDateObj?.from) {
        conditionFromAndTo = value.isBefore(dayjs(disabledDateObj?.from), mode);
      } else if (disabledDateObj?.to) {
        conditionFromAndTo = value.isAfter(dayjs(disabledDateObj?.to), mode);
      }

      let conditionBefore = true;
      if (disabledDateObj?.before) {
        conditionBefore = !value.isBefore(dayjs(disabledDateObj?.before), mode);
      }

      let conditionAfter = true;
      if (disabledDateObj?.after) {
        conditionAfter = !value.isAfter(dayjs(disabledDateObj?.after), mode);
      }

      return conditionFunction && conditionArray && conditionFromAndTo && conditionBefore && conditionAfter;
    };

    const yearOptions = computed(() => {
      return Array.from(new Array(200), (_, index) => 1900 + index).filter((year) => isAvailable(year));
    });
    const monthOptions = computed(() => {
      return Array.from(new Array(12), (_, index) => index).filter((month) => isAvailable(data.year, month));
    });
    const dateOptions = computed(() => {
      let maxDate = 31;
      if (pickerColumns.value.indexOf('year') > -1 && pickerColumns.value.indexOf('month') > -1) {
        const theMonth = dayjs().year(data.year).month(data.month);
        maxDate = theMonth.daysInMonth ? theMonth.daysInMonth() : 0;
      }
      return Array.from(maxDate ? new Array(maxDate) : [], (_, index) => index + 1).filter((date) =>
        isAvailable(data.year, data.month, date),
      );
    });
    const hourOptions = computed(() => {
      return Array.from(new Array(24), (_, index) => index).filter((hour) =>
        isAvailable(data.year, data.month, data.date, hour),
      );
    });
    const minuteOptions = computed(() => {
      return Array.from(new Array(60), (_, index) => index).filter((minute) =>
        isAvailable(data.year, data.month, data.date, data.hour, minute),
      );
    });
    const secondOptions = computed(() => {
      return Array.from(new Array(60), (_, index) => index).filter((second) =>
        isAvailable(data.year, data.month, data.date, data.hour, data.minute, second),
      );
    });

    const getOutputValue = (v = undefined) => {
      let value = v;
      if (value === undefined) {
        value = dayjs().month(0).date(1).hour(0).minute(0).second(0);
        pickerColumns.value.forEach((mode, index) => {
          value = value[mode](data.pickerValue[index]) as dayjs.Dayjs;
        });
      }

      // 当指定format为空时，输出类型尽量保持与输入类型格式相同
      let output: DateValue = '';
      if (props.format) {
        output = value.format(props.format);
      } else if (typeof props.value === 'number') {
        output = value.unix();
      } else {
        output = value.format(modeFormat.value);
      }
      return output;
    };

    const onConfirm = (e: MouseEvent) => {
      const outputValue = getOutputValue();

      emitEvent('change', outputValue);
      emitEvent('update:modelValue', outputValue);
      emitEvent('confirm', { value: outputValue, e });
    };

    const onCancel = (e: MouseEvent) => {
      // TODO: columnChange事件
      emitEvent('cancel', { e });
    };

    const onChange = (v) => {
      if (JSON.stringify(data.pickerValue) !== JSON.stringify(v)) {
        data.pickerValue = v;

        pickerColumns.value.forEach((mode, index) => {
          data[mode] = v[index];
        });
      }
    };

    const onColumnChange = (value, index) => {
      context.emit('columnChange', {
        value,
        index,
      });
    };

    const getWeekdayText = (date) => {
      const week = dayjs().year(data.year).month(data.month).date(date).day();
      let text = '';
      switch (week) {
        case 0:
          text = '日';
          break;
        case 1:
          text = '一';
          break;
        case 2:
          text = '二';
          break;
        case 3:
          text = '三';
          break;
        case 4:
          text = '四';
          break;
        case 5:
          text = '五';
          break;
        case 6:
          text = '六';
          break;
      }
      return `(${text})`;
    };

    return {
      className,
      confirmButtonText,
      cancelButtonText,
      onConfirm,
      onCancel,
      pickerColumns,
      yearOptions,
      monthOptions,
      dateOptions,
      hourOptions,
      minuteOptions,
      secondOptions,
      onColumnChange,
      onChange,
      defaultPickerValue,
      data,
      getWeekdayText,
      title,
    };
  },
});
</script>
