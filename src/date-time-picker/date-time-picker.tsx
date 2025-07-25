import { ref, computed, defineComponent, toRefs, watch, nextTick } from 'vue';
import dayjs, { Dayjs, UnitType } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import objectSupport from 'dayjs/plugin/objectSupport';
import { isArray } from 'lodash-es';

import config from '../config';
import DateTimePickerProps from './props';
import { getMeaningColumn } from './shared';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { Picker as TPicker } from '../picker';
import { PickerColumn, PickerColumnItem, PickerValue, PickerContext } from '../picker/type';
import { usePrefixClass, useConfig } from '../hooks/useClass';

import type { TdDateTimePickerProps, TimeModeValues } from './type';

dayjs.extend(weekday);
dayjs.extend(customParseFormat);
dayjs.extend(objectSupport);

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-date-time-picker`,
  components: { TPicker },
  props: DateTimePickerProps,
  emits: ['change', 'cancel', 'confirm', 'pick', 'update:modelValue', 'update:value'],
  setup(props, { slots }) {
    const dateTimePickerClass = usePrefixClass('date-time-picker');
    const { globalConfig } = useConfig('dateTimePicker');
    const className = computed(() => [`${dateTimePickerClass.value}`]);
    const { value } = toRefs(props);
    const renderTNodeJSX = useTNodeJSX();

    const [innerValue, setDateTimePickerValue] = useVModel(
      value,
      ref(props.modelValue),
      props.defaultValue,
      props.onChange,
    );
    const title = computed(() => {
      return props.title || globalConfig.value.title;
    });

    const confirmButtonText = computed(() => props.confirmBtn || globalConfig.value.confirm);
    const cancelButtonText = computed(() => props.cancelBtn || globalConfig.value.cancel);
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
        year: globalConfig.value.yearLabel,
        month: globalConfig.value.monthLabel,
        date: globalConfig.value.dateLabel,
        hour: globalConfig.value.hourLabel,
        minute: globalConfig.value.minuteLabel,
        second: globalConfig.value.secondLabel,
      };

      const generateDayWithWeekColumn = (date: Dayjs) => {
        const startOfMonth = date.startOf('month');
        const endOfMonth = date.endOf('month');
        const daysOfWeek = [];
        const type = 'date';

        for (let i = 0; i <= endOfMonth.diff(startOfMonth, 'days'); i += 1) {
          const currentDate = startOfMonth.add(i, 'days');
          const dayName = currentDate.format('ddd');

          daysOfWeek.push({
            value: `${i + 1}`,
            label: props.renderLabel ? props.renderLabel(type, i) : `${i + 1}${typeUnit[type] || ''} ${dayName}`,
          });
        }

        ret.push(daysOfWeek);
      };

      const generateColumn = (start: number, end: number, type: TimeModeValues) => {
        const arr: PickerColumnItem[] = [];
        const step = (props.steps as TdDateTimePickerProps['steps'])[type] || 1;
        for (let i = start; i <= end; i += step) {
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
        if (props.showWeek) {
          generateDayWithWeekColumn(curDate.value);
        } else {
          generateColumn(lower, upper, 'date');
        }
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

    const onConfirm = (value: string[]) => {
      const dayObject = value.reduce((map, cur, index) => {
        const type = meaningColumn.value[index];
        map[type] = cur;
        return map;
      }, {});
      const cur = dayjs(dayObject);
      props.onConfirm?.(dayjs(cur || curDate.value).format(props.format));
      setDateTimePickerValue(dayjs(cur || curDate.value).format(props.format));
    };

    const onCancel = (context: { e: MouseEvent }) => {
      props.onCancel?.({ e: context.e });
    };

    const onPick = (value: Array<PickerValue>, context: PickerContext) => {
      const { column, index } = context;
      const type = meaningColumn.value[column];
      const val = curDate.value.set(type as UnitType, parseInt(columns.value[column][index]?.value, 10));

      curDate.value = rationalize(val);
      props.onPick?.(rationalize(val).format(props.format));
    };

    watch(innerValue, (val) => {
      curDate.value = calcDate(val);
    });

    return () => {
      return (
        <t-picker
          class={className.value}
          value={valueOfPicker.value}
          title={title.value}
          confirm-btn={confirmButtonText.value}
          cancel-btn={cancelButtonText.value}
          columns={columns.value}
          onConfirm={onConfirm}
          onCancel={onCancel}
          onPick={onPick}
          header={() => renderTNodeJSX('header')}
          footer={() => renderTNodeJSX('footer')}
        />
      );
    };
  },
});
