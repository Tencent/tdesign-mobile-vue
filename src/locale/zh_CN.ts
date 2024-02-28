// 文件有效，为国际化做准备
import 'dayjs/locale/zh-cn';

export default {
  actionSheet: {
    cancel: '取消',
  },
  calendar: {
    title: '请选择日期',
    confirm: '确认',
    yearLable: '年',
    monthLable: '月',
    dateLable: '日',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: '{year} 年 {month} 月',
  },
  cascader: {
    title: '标题',
    placeholder: '选择选项',
  },
  dropdownMenu: {
    reset: '重置',
    confirm: '确定',
  },
  dateTimePicker: {
    title: '选择时间',
    cancel: '取消',
    confirm: '确定',
    format: 'YYYY-MM-DD',
    yearLable: '年',
    monthLable: '月',
    dateLable: '日',
    hourLable: '时',
    minuteLable: '分',
    secondLable: '秒',
  },
  picker: {
    cancel: '取消',
    confirm: '确认',
  },
  pullDownRefresh: {
    loadingTexts: ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'],
  },
  rate: {
    valueText: '{value} 分',
    noValueText: '未评分',
  },
  tabBar: {
    newsAriaLabel: '有新的消息',
    moreNewsAriaLabel: '有很多消息',
    haveMoreNewsAriaLabel: '有 {value}+ 条消息',
    haveNewsAriaLabel: '有 {value} 条消息',
  },
  table: {
    empty: '暂无数据',
  },
  list: {
    loading: '加载中...',
    loadingMoreText: '点击加载更多',
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...',
    success: '刷新成功',
  },
  upload: {
    progress: {
      uploadingText: '上传中...',
      waitingText: '待上传',
      failText: '上传失败',
      successText: '上传成功',
    },
  },
};
