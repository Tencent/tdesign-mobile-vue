/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TriggerSource } from '../picker';
import { TNode } from '../common';

export interface TdDateTimePickerProps {
  /**
   * 自动关闭；在确认、取消、点击遮罩层自动关闭，不需要手动设置 visible
   * @default false
   */
  autoClose?: boolean;
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
   * 列选项过滤函数，支持自定义列内容。(type 值可为: year, month, date, hour, minute, second)
   */
  filter?: (type: TimeModeValues, columns: DateTimePickerColumn) => DateTimePickerColumn;
  /**
   * 底部内容
   */
  footer?: TNode;
  /**
   * 用于pick、change、confirm事件参数格式化[详细文档](https://day.js.org/docs/en/display/format)
   * @default 'YYYY-MM-DD HH:mm:ss'
   */
  format?: string;
  /**
   * 顶部内容
   */
  header?: TNode;
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
   * 时间间隔步数，示例：`{ minute: 5 }`
   */
  steps?: Record<TimeModeValues, number>;
  /**
   * 标题
   * @default '选择时间'
   */
  title?: string;
  /**
   * 是否使用弹出层包裹
   * @default false
   */
  usePopup?: boolean;
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
   * 是否显示
   * @default false
   */
  visible?: boolean;
  /**
   * 取消按钮点击时触发
   */
  onCancel?: (context: { e: MouseEvent }) => void;
  /**
   * value改变时触发
   */
  onChange?: (value: DateValue) => void;
  /**
   * 关闭时触发
   */
  onClose?: (trigger: TriggerSource) => void;
  /**
   * 确认按钮点击时触发
   */
  onConfirm?: (value: DateValue) => void;
  /**
   * 选中值发生变化时触发
   */
  onPick?: (value: DateValue) => void;
}

export type DateTimePickerColumn = DateTimePickerColumnItem[];

export interface DateTimePickerColumnItem {
  label: string;
  value: string;
}

export type DateTimePickerMode = TimeModeValues | Array<TimeModeValues>;

export type TimeModeValues = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second';

export type DateValue = string | number;
