/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdDateTimePickerProps {
  /**
   * 取消按钮文字
   * @default 取消
   */
  cancelBtn?: string;
  /**
   * 确定按钮文字
   * @default ''
   */
  confirmBtn?: string;
  /**
   * 选择器的最大可选时间，默认为当前时间+10年
   */
  end?: string | number;
  /**
   * 底部内容
   * @default true
   */
  footer?: TNode;
  /**
   * 用于pick、change、confirm事件参数格式化[详细文档](https://day.js.org/docs/en/display/format)
   * @default 'YYYY-MM-DD HH:mm:ss'
   */
  format?: string;
  /**
   * 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 TNode 表示自定义头部内容
   * @default true
   */
  header?: boolean | TNode;
  /**
   * year = 年；month = 年月；date = 年月日；hour = 年月日时； minute = 年月日时分；当类型为数组时，第一个值控制年月日，第二个值控制时分秒
   * @default 'date'
   */
  mode?: DateTimePickerMode;
  /**
   * 自定义label
   */
  renderLabel?: (type: string, value: number) => string;
  /**
   * 【开发中】是否在日期旁边显示周几（如周一，周二，周日等）
   * @default false
   */
  showWeek?: boolean;
  /**
   * 选择器的最小可选时间，默认为当前时间-10年
   */
  start?: string | number;
  /**
   * 标题
   * @default '选择时间'
   */
  title?: string;
  /**
   * 选中值
   */
  value?: DateValue;
  /**
   * 选中值，非受控属性
   */
  defaultValue?: DateValue;
  /**
   * 选中值
   */
  modelValue?: DateValue;
  /**
   * 取消按钮点击时触发
   */
  onCancel?: (context: { e: MouseEvent }) => void;
  /**
   * value改变时触发
   */
  onChange?: (value: DateValue) => void;
  /**
   * 确认按钮点击时触发
   */
  onConfirm?: (value: DateValue) => void;
  /**
   * 选中值发生变化时触发
   */
  onPick?: (value: DateValue) => void;
}

export type DateTimePickerMode = TimeModeValues | Array<TimeModeValues>;

export type TimeModeValues = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second';

export type DateValue = string | number;
