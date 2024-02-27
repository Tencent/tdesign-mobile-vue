// 文件有效，为国际化做准备
import 'dayjs/locale/zh-cn';

export default {
  calendar: {
    confirmBtn: '确认',
    title: '请选择日期',
    yearLable: '年',
    monthLable: '月',
    dateLable: '日',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: (year: number, month: number) => `${year}年${month}月`,
  },
  dateTimePicker: {
    title: '选择时间',
    cancelBtn: '取消',
    confirmBtn: '确定',
    format: 'YYYY-MM-DD',
    yearLable: '年',
    monthLable: '月',
    dateLable: '日',
    hourLable: '时',
    minuteLable: '分',
    secondLable: '秒',
  },
  table: {
    empty: '暂无数据',
    loadingText: '正在加载中，请稍后',
  },
  input: {
    placeholder: '请输入',
  },
  list: {
    loading: '加载中...',
    loadingMoreText: '点击加载更多',
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...',
    success: '刷新成功',
  },
} as const;
