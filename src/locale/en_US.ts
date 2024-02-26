// 文件有效，为国际化做准备
import 'dayjs/locale/en';

export default {
  calendar: {
    confirmBtn: 'Confirm',
    title: 'select a date',
    yearLable: 'year',
    monthLable: 'month',
    dateLable: 'date',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
  },
  dateTimePicker: {
    title: 'select time',
    cancelBtn: 'Cancel',
    confirmBtn: 'Confirm',
    format: 'YYYY-MM-DD',
    yearLable: 'year',
    monthLable: 'month',
    dateLable: 'date',
    hourLable: 'hour',
    minuteLable: 'minute',
    secondLable: 'second',
  },
  table: {
    empty: 'Empty Data',
    loadingText: 'loading...',
  },
  input: {
    placeholder: 'please enter',
  },
} as const;
