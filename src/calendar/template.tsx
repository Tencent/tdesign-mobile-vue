import { computed, watch, inject, ref, toRaw, defineComponent } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import TButton from '../button';
import config from '../config';
import Props from './template-props';
import { useTNodeJSX } from '../hooks/tnode';
import { TdCalendarProps, TDate, TDateType } from './type';
import { usePrefixClass, useConfig } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-calendar`;

export default defineComponent({
  name,
  components: {
    TButton,
  },
  props: Props,
  emits: ['visible-change'],
  setup(_props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const { t, globalConfig } = useConfig('calendar');
    const calendarClass = usePrefixClass('calendar');

    const props = inject('templateProps') as TdCalendarProps;
    // 获取时间年月日起
    const getYearMonthDay = (date: Date) => {
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      };
    };
    const usePopup = computed(() => props.usePopup);
    const templateRef = ref(null);
    const valueRef = ref(props.value);
    const selectedDate = ref();
    const firstDayOfWeek = computed(() => props.firstDayOfWeek || 0);
    const days = computed(() => {
      const raw = globalConfig.value.weekdays;
      const ans = [];
      let i = firstDayOfWeek.value % 7;

      while (ans.length < 7) {
        ans.push(raw[i]);
        i = (i + 1) % 7;
      }

      return ans;
    });
    const today = new Date();
    const minDate = computed(() => (props.minDate ? new Date(props.minDate) : today));
    const maxDate = computed(() =>
      props.maxDate ? new Date(props.maxDate) : new Date(today.getFullYear(), today.getMonth() + 6, today.getDate()),
    );

    // 获取日期
    const getDate = (year: number, month: number, day: number) => new Date(year, month, day);

    const confirmBtn = computed(() => {
      if (typeof _props.confirmBtn === 'string') {
        return { content: _props.confirmBtn || globalConfig.value.confirm };
      }
      return _props.confirmBtn;
    });

    // 选择日期
    const handleSelect = (year: number, month: number, date: number, dateItem: TDate) => {
      if (dateItem.type === 'disabled') return;
      const selected = new Date(year, month, date);

      if (props.type === 'range' && Array.isArray(selectedDate.value)) {
        if (selectedDate.value.length === 1) {
          if (selectedDate.value[0] > selected) {
            selectedDate.value = [selected];
          } else {
            selectedDate.value = [selectedDate.value[0], selected];
          }
        } else {
          selectedDate.value = [selected];
          if (!confirmBtn.value && selectedDate.value.length === 2) {
            props.onChange?.(selectedDate.value);
          }
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
        if (!confirmBtn.value) {
          props.onChange?.(selectedDate.value);
        }
      }
      props.onSelect?.(toRaw(selectedDate.value));
    };
    // 确认
    const handleConfirm = () => {
      context.emit('visible-change');
      props.onClose?.('confirm-btn');
      props.onConfirm?.(toRaw(selectedDate.value));
    };
    const handleClose = () => {
      context.emit('visible-change');
      props.onClose?.('close-btn');
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
      let { year: minYear, month: minMonth } = getYearMonthDay(minDate.value);
      const { year: maxYear, month: maxMonth } = getYearMonthDay(maxDate.value);
      const calcType = (year: number, month: number, date: number): TDateType => {
        const curDate = new Date(year, month, date, 23, 59, 59);

        if (props.type === 'single') {
          if (isSameDate({ year, month, date }, selectedDate.value)) return 'selected';
        }
        if (props.type === 'multiple') {
          const hit = selectedDate.value.some((item: Date) => isSameDate({ year, month, date }, item));
          if (hit) {
            return 'selected';
          }
        }
        if (props.type === 'range') {
          if (Array.isArray(selectedDate.value)) {
            const [startDate, endDate] = selectedDate.value;

            if (startDate && isSameDate({ year, month, date }, startDate)) return 'start';
            if (endDate && isSameDate({ year, month, date }, endDate)) return 'end';
            if (
              startDate &&
              endDate &&
              curDate.getTime() > startDate.getTime() &&
              curDate.getTime() < endDate.getTime()
            )
              return 'centre';
          }
        }

        const minCurDate = new Date(year, month, date, 0, 0, 0);
        if (curDate.getTime() < minDate.value.getTime() || minCurDate.getTime() > maxDate.value.getTime()) {
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
    context.expose({
      valueRef,
      templateRef,
    });
    const getDateItemClass = (dateItem: TDate) => {
      let className = `${calendarClass.value}__dates-item`;
      if (dateItem.type) {
        className = `${className} ${calendarClass.value}__dates-item--${dateItem.type}`;
      }
      if (dateItem.className) {
        className = `${className} ${dateItem.className}`;
      }
      return className;
    };
    return () => {
      const renderCell = (dateItem: TDate) => {
        const cell = renderTNodeJSX('cell', { params: { item: dateItem } });
        if (cell) {
          return cell;
        }
        let className = `${calendarClass.value}__dates-item-suffix`;
        if (dateItem.type) {
          className = `${className} ${calendarClass.value}__dates-item-suffix--${dateItem.type}`;
        }
        return (
          <>
            {dateItem.prefix && <div class={`${calendarClass.value}__dates-item-prefix`}>{dateItem.prefix}</div>}
            {dateItem.day}
            {dateItem.suffix && <div class={className}>{dateItem.suffix}</div>}
          </>
        );
      };
      const className = usePopup.value
        ? `${calendarClass.value} ${calendarClass.value}--popup`
        : `${calendarClass.value}`;

      const renderConfirmBtn = () => {
        if (confirmBtn.value && typeof confirmBtn.value !== 'object') {
          return confirmBtn.value;
        }
        if (confirmBtn.value && Array.isArray(confirmBtn.value)) {
          return confirmBtn.value;
        }
        if (confirmBtn.value && typeof confirmBtn.value === 'object') {
          return <t-button block theme="primary" {...confirmBtn.value} onClick={handleConfirm} />;
        }
      };

      return (
        <div ref={templateRef} class={className}>
          <div class={`${calendarClass.value}__title`}>{_props.title || globalConfig.value.title}</div>
          {usePopup.value && (
            <CloseIcon class={`${calendarClass.value}__close-btn`} size="24" onClick={handleClose}></CloseIcon>
          )}
          <div class={`${calendarClass.value}__days`}>
            {(days.value || []).map((item, index) => (
              <div key={index} class={`${calendarClass.value}__days-item`}>
                {item}
              </div>
            ))}
          </div>
          <div class={`${calendarClass.value}__months`} style="overflow: auto">
            {months.value.map((item, index) => (
              <>
                <div class={`${calendarClass.value}__month`} key={index}>
                  {t(globalConfig.value.monthTitle, { year: item.year, month: globalConfig.value.months[item.month] })}
                </div>
                <div class={`${calendarClass.value}__dates`} key={index}>
                  {new Array((item.weekdayOfFirstDay - firstDayOfWeek.value + 7) % 7)
                    .fill(0)
                    .map((emptyItem, index) => (
                      <div key={index} />
                    ))}
                  {item.months.map((dateItem, dateIndex) => (
                    <>
                      <div
                        key={`${index}_${dateIndex}`}
                        class={getDateItemClass(dateItem)}
                        onClick={() => handleSelect(item.year, item.month, dateItem.day, dateItem)}
                      >
                        {renderCell(dateItem)}
                      </div>
                    </>
                  ))}
                </div>
              </>
            ))}
          </div>
          {usePopup.value && <div class={`${calendarClass.value}__footer`}>{renderConfirmBtn()}</div>}
        </div>
      );
    };
  },
});
