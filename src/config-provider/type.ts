import { GlobalIconConfig } from 'tdesign-icons-vue-next';
import { ButtonProps } from '../button';

import { TNode } from '../common';

export interface GlobalConfigProvider {
  /**
   * CSS 类名前缀
   * @default t
   */
  classPrefix?: string;
  /**
   * 日历组件全局配置
   */
  calendar?: CalendarConfig;
  /**
   * 时间选择器全局配置
   */
  dateTimePicker?: DateTimePickerConfig;
  /**
   * 图标全局配置
   */
  icon?: IconConfig;
  /**
   * 表格组件全局配置
   */
  table?: TableConfig;
}

export interface InputConfig {
  /**
   * 语言配置，“请输入”占位符描述文本
   * @default ''
   */
  placeholder?: string;
}
export interface CalendarConfig {
  confirmBtn?: string;
  title?: string;
  yearLable?: string;
  monthLable?: string;
  dateLable?: string;
  weekdays?: string[];
  monthTitle?: (a: string | number, b: string | number) => void;
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
  cancelBtn?: string;
  /**
   * 语言配置，“确定” 描述文本
   * @default ''
   */
  confirmBtn?: string;
  /**
   * 日期格式化规则
   * @default 'YYYY-MM-DD';
   */
  format?: string;
  yearLable?: string;
  monthLable?: string;
  dateLable?: string;
  hourLable?: string;
  minuteLable?: string;
  secondLable?: string;
}

export interface TableConfig {
  /**
   * 语言配置，“暂无数据” 描述文本
   */
  empty?: string | TNode;
}

export type IconConfig = GlobalIconConfig;
