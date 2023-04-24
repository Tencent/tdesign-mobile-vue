/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ButtonProps } from '../button';
import { TNode } from '../common';

export interface TdCalendarProps {
  /**
   * 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。
   * @default ''
   */
  confirmBtn?: string | ButtonProps | TNode | null;
  /**
   * 第一天从星期几开始，默认 0 = 周日
   * @default 0
   */
  firstDayOfWeek?: number;
  /**
   * 用于格式化日期的函数
   */
  format?: CalendarFormatType;
  /**
   * 最大可选的日期，不传则默认半年后
   */
  maxDate?: number | Date;
  /**
   * 最小可选的日期，不传则默认今天
   */
  minDate?: number | Date;
  /**
   * 标题，不传默认为“请选择日期”
   */
  title?: string | TNode;
  /**
   * 日历的选择类型，single = 单选；multiple = 多选; range = 区间选择
   * @default 'single'
   */
  type?: 'single' | 'multiple' | 'range';
  /**
   * 是否使用弹出层包裹日历
   * @default true
   */
  usePopup?: boolean;
  /**
   * 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组
   */
  value?: number | Date | TCalendarValue[];
  /**
   * 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组，非受控属性
   */
  defaultValue?: number | Date | TCalendarValue[];
  /**
   * 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组
   */
  modelValue?: number | Date | TCalendarValue[];
  /**
   * 是否显示日历；`usePopup` 为 true 时有效
   * @default false
   */
  visible?: boolean;
  /**
   * 不显示 confirm-btn 时，完成选择时触发（暂不支持 type = multiple）
   */
  onChange?: (value: Date) => void;
  /**
   * 关闭按钮时触发
   */
  onClose?: (trigger: CalendarTrigger) => void;
  /**
   * 点击确认按钮时触发
   */
  onConfirm?: (value: Date) => void;
  /**
   * 点击日期时触发
   */
  onSelect?: (value: Date) => void;
}

export type CalendarFormatType = (day: TDate) => TDate;

export type TDateType = 'selected' | 'disabled' | 'start' | 'centre' | 'end' | '';

export interface TDate {
  date: Date;
  day: number;
  type: TDateType;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export type TCalendarValue = number | Date;

export type CalendarTrigger = 'close-btn' | 'confirm-btn' | 'overlay';
