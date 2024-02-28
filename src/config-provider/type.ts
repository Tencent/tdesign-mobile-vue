import { GlobalIconConfig } from 'tdesign-icons-vue-next';
import { ButtonProps } from '../button';

import { TNode } from '../common';

export interface GlobalConfigProvider {
  /**
   * 动作面板全局配置
   */
  actionSheet?: ActionSheetConfig;
  /**
   * 日历组件全局配置
   */
  calendar?: CalendarConfig;
  /**
   * 级联选择器全局配置
   */
  cascader?: CascaderConfig;
  /**
   * CSS 类名前缀 【开发中】
   * @default t
   */
  classPrefix?: string;
  /**
   * 下拉菜单全局配置
   */
  dropdownMenu?: DropdownMenuConfig;
  /**
   * 时间选择器全局配置
   */
  dateTimePicker?: DateTimePickerConfig;
  /**
   * 列表组件全局配置
   */
  list?: ListConfig;
  /**
   * 选择器全局配置
   */
  picker?: PickerConfig;
  /**
   * 下拉刷新全局配置
   */
  pullDownRefresh?: PullDownRefreshConfig;
  /**
   * 评分全局配置
   */
  rate?: RateConfig;
  /**
   * 侧边导航栏全局配置
   */
  tabBar?: TabBarConfig;
  /**
   * 表格组件全局配置
   */
  table?: TableConfig;
  /**
   * 上传组件全局配置
   */
  upload?: UploadConfig;
}

export interface ActionSheetConfig {
  /**
   * 取消 描述文本
   * @default ''
   */
  cancel?: string;
}

export interface CalendarConfig {
  confirm?: string;
  title?: string;
  weekdays?: string[];
  monthTitle?: string;
}
export interface CascaderConfig {
  title?: string;
  placeholder?: string;
}

export interface DropdownMenuConfig {
  reset?: string;
  confirm?: string;
}

export interface DateTimePickerConfig {
  /**
   * 语言配置，标题 “选择时间” 描述文本
   * @default ''
   */
  title?: string;
  /**
   * 取消 描述文本
   * @default ''
   */
  cancel?: string;
  /**
   * 语言配置，“确定” 描述文本
   * @default ''
   */
  confirm?: string;
  /**
   * 日期格式化规则
   * @default 'YYYY-MM-DD';
   */
  format?: string;
  yearLabel?: string;
  monthLabel?: string;
  dateLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
  secondLabel?: string;
}
export interface PickerConfig {
  /**
   * 取消 描述文本
   * @default ''
   */
  cancel?: string;
  /**
   * 语言配置，“确定” 描述文本
   * @default ''
   */
  confirm?: string;
}
export interface PullDownRefreshConfig {
  /**
   * ['下拉刷新', '松手刷新', '正在刷新', '刷新完成']。提示语
   * @default ''
   */
  loadingTexts?: string[];
}

export interface RateConfig {
  /**
   * 语言配置，“分” 描述文本
   */
  valueText?: string;
  /**
   * 语言配置，“未评分” 描述文本
   */
  noValueText?: string;
}
export interface TabBarConfig {
  newsAriaLabel?: string;
  moreNewsAriaLabel?: string;
  haveNewsAriaLabel?: string;
  haveMoreNewsAriaLabel?: string;
}

export interface TableConfig {
  /**
   * 语言配置，“暂无数据” 描述文本
   */
  empty?: string | TNode;
}

export type IconConfig = GlobalIconConfig;

export interface ListConfig {
  loading?: string;
  loadingMoreText?: string;
  pulling?: string;
  loosing?: string;
  success?: string;
}

export interface UploadConfig {
  /**
   * 语言配置，上传进度相关。示例：{ uploadText: '上传中', waitingText: '待上传', 'failText': '上传失败', successText: '上传成功' }
   */
  progress?: UploadConfigProgress;
}

export interface UploadConfigProgress {
  /**
   * 语言配置，“上传失败”文本描述
   * @default ''
   */
  failText?: string;
  /**
   * 语言配置，“上传成功”文本描述
   * @default ''
   */
  successText?: string;
  /**
   * 语言配置，“上传中”文本描述
   * @default ''
   */
  uploadingText?: string;
  /**
   * 语言配置，“待上传”文本描述
   * @default ''
   */
  waitingText?: string;
}
