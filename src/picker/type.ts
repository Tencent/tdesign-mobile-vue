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
   * 配置每一列的选项
   * @default []
   */
  columns: Array<PickerColumn> | ((item: Array<PickerValue>) => Array<PickerColumn>);
  /**
   * 确定按钮文字
   * @default '确认'
   */
  confirmBtn?: string | ButtonProps;
  /**
   * 自定义label
   */
  renderLabel?: (item: PickerColumnItem) => string;
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
  onChange?: (value: Array<PickerValue>, context: { columns: Array<PickerContext>; e: MouseEvent }) => void;
  /**
   * 点击确认按钮时触发
   * @default ''
   */
  onConfirm?: (value: Array<PickerValue>, context: { index: number[] }) => void;
  /**
   * 任何一列选中都会触发，不同的列参数不同。`context.column` 表示第几列变化，`context.index` 表示变化那一列的选中项下标
   * @default ''
   */
  onPick?: (value: Array<PickerValue>, context: PickerContext) => void;
}

export type PickerColumn = PickerColumnItem[];

export interface PickerColumnItem {
  label: string;
  value: string;
}

export type PickerValue = string | number;

export interface PickerContext {
  column: number;
  index: number;
}
