<template>
  <div :class="className">
    <t-picker
      :defaultValue="[2022, 6, 21, 5, 5, 5]"
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
        :formatter="(val) => `${val}日(${showWeek ? getWeekdayText(val) : ''})`"
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
import config from '../config';
import DateTimePickerProps from './props';
import { DateValue, TimeModeValues } from './type';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);

const { prefix } = config;
const name = `${prefix}-date-time-picker`;

export default defineComponent({
  name,
  props: DateTimePickerProps,
  emits: ['change', 'cancel', 'confirm', 'update:modelValue', 'columnChange'],
  setup(props, context) {
    const className = computed(() => [`${name}`]);

    // 根据props.mode判断展示哪些列
    const pickerColumns: ComputedRef<TimeModeValues[]> = computed(() => {
      const dateModes: Array<TimeModeValues> = ['year', 'month', 'date'];
      const timeModes: Array<TimeModeValues> = ['hour', 'minute', 'second'];
      ;[dateModes, timeModes].forEach((modes) => {
        [...modes].reverse().every((mode) => {
          if (props.mode instanceof Array) {
            if (!props.mode.includes(mode)) {
              modes.pop();
              return true;
            } else {
              return false;
            }
          } else if (props.mode !== mode) {
            modes.pop();
            return true;
          } else {
            return false;
          }
        });
      });
      return [...dateModes, ...timeModes];
    });

    const defaultPickerValue = computed(() => {
      const dayjsValueProps = dayjs(props.value as any);
      const value = pickerColumns.value.map((mode) => {
        return dayjsValueProps[mode]();
      });
      return value;
    });

    const defaultModeValue = computed(() => {
      const dayjsValueDefault = dayjs().month(0).date(1).hour(0).minute(0).second(0);
      const dayjsValueProps = dayjs(props.value as any);
      const value: Record<TimeModeValues, number> = Object.create({});

      ;['year', 'month', 'date', 'hour', 'minute', 'second'].forEach((mode) => {
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

    const yearIsAvailable = (year) => {
      let value = dayjs().year(year).month(0).date(1).hour(0).minute(0).second(0);
      return !value.isBefore(dayjs('2021-05-15'), 'year');
    };

    const monthIsAvailable = (year, month) => {
      let value = dayjs().year(year).month(month).date(1).hour(0).minute(0).second(0);
      return !value.isBefore(dayjs('2021-05-15'), 'month');
    };

    const dateIsAvailable = (year, month, date) => {
      let value = dayjs().year(year).month(month).date(date).hour(0).minute(0).second(0);
      return !value.isBefore(dayjs('2021-05-15'), 'date');
    };

    const yearOptions = computed(() => {
      return Array.from(new Array(200), (_, index) => 1900 + index).filter(year => yearIsAvailable(year));
    });
    const monthOptions = computed(() => {
      return Array.from(new Array(12), (_, index) => index).filter(month => monthIsAvailable(data.year, month));
    });
    const dateOptions = computed(() => {
      let maxDate = 31;
      if (pickerColumns.value.indexOf('year') > -1 && pickerColumns.value.indexOf('month') > -1) {
        maxDate = dayjs()
          .year(data.year)
          .month(data.month)
          .daysInMonth();
      }
      return Array.from(new Array(maxDate), (_, index) => index + 1).filter(date => dateIsAvailable(data.year, data.month, date));
    });
    const hourOptions = computed(() => {
      return Array.from(new Array(24), (_, index) => index);
    });
    const minuteOptions = computed(() => {
      return Array.from(new Array(60), (_, index) => index);
    });
    const secondOptions = computed(() => {
      return Array.from(new Array(60), (_, index) => index);
    });

    const getOutputValue = () => {
      let value = dayjs().month(0).date(1).hour(0).minute(0).second(0);
      pickerColumns.value.forEach((mode, index) => {
        value = value[mode](data.pickerValue[index]) as dayjs.Dayjs;
      });

      // 当指定format为空时，输出类型尽量保持与输入类型格式相同
      let output: DateValue = '';
      if (props.format) {
        output = value.format(props.format);
      } else if (typeof props.value === 'number') {
        output = value.unix();
      } else {
        let format = '';
        if (
          pickerColumns.value.includes('year') ||
          pickerColumns.value.includes('month') ||
          pickerColumns.value.includes('date')
        ) {
          format += 'YYYY-MM-DD';
        }
        if (
          pickerColumns.value.includes('year') ||
          pickerColumns.value.includes('month') ||
          pickerColumns.value.includes('date')
        ) {
          format += ' HH:mm:ss';
        }
        output = value.format(format.trim());
      }
      return output;
    }

    const onConfirm = (e: MouseEvent) => {
      const outputValue = getOutputValue();

      context.emit('change', outputValue);
      context.emit('update:modelValue', outputValue);
      context.emit('confirm', { value: outputValue, e });
    };

    const onCancel = (e: MouseEvent) => {
      context.emit('cancel', { e });
    };

    const onChange = (v) => {
      if (JSON.stringify(data.pickerValue) !== JSON.stringify(v)) {
        data.pickerValue = v;

        // pickerColumns.value.forEach((mode, index) => {
        //   data[mode] = v[index];
        // });
      }
    };

    const onColumnChange = (value, index) => {
      context.emit('columnChange', {
        value,
        index,
      });
    }

    const getWeekdayText = (date) => {
      const week = dayjs().year(data.year).month(data.month).date(date).day();
      switch (week) {
        case 0:
          return '日';
        case 1:
          return '一';
        case 2:
          return '二';
        case 3:
          return '三';
        case 4:
          return '四';
        case 5:
          return '五';
        case 6:
          return '六';
      }
      return '';
    }

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
      data,
      getWeekdayText,
      title,
    };
  },
});
</script>
