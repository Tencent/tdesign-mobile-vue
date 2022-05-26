/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ButtonProps } from '../button';
import { TNode } from '../common';

export interface TdPickerProps {
  /**
   * 取消按钮文字
   * @default '取消'
   */
  cancelBtn?: string | ButtonProps;
  /**
   * 确定按钮文字
   * @default '确认'
   */
  confirmBtn?: string | ButtonProps;
  /**
   * 底部内容
   */
  footer?: TNode;
  /**
   * 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 TNode 表示自定义头部内容
   * @default true
   */
  header?: boolean | TNode;
  /**
   * 标题
   * @default ''
   */
  title?: string;
  /**
   * 选中值
   */
  value?: Array<PickerValue>;
  /**
   * 选中值，非受控属性
   */
  defaultValue?: Array<PickerValue>;
  /**
   * 选中值
   */
  modelValue?: Array<PickerValue>;
  /**
   * 是否显示
   * @default false
   */
  visible?: boolean;
  /**
   * 点击取消按钮时触发
   * @default ''
   */
  onCancel?: (context: { e: MouseEvent }) => void;
  /**
   * 选中变化时候触发
   * @default ''
   */
  onChange?: (value: Array<PickerValue>, context: { index: Array<number>; e: MouseEvent }) => void;
  /**
   * 任何一列选中都会触发，不同的列参数不同。`context.column` 表示第几列变化，`context.index` 表示变化那一列的选中项下标
   * @default ''
   */
  onPick?: (value: Array<PickerValue>, context: { index: number; column: number; e: MouseEvent }) => void;
}

export interface TdPickerItemProps {
  /**
   * 格式化标签
   */
  format?: (option: PickerItemOption) => string;
  /**
   * 数据源
   * @default []
   */
  options: Array<PickerItemOption>;
}

export type PickerValue = string | number;

export interface PickerItemOption {
  label: string;
  value: string | number;
}
