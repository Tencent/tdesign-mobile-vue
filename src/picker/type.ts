/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdPickerProps {
  /**
   * 自动关闭；在确认、取消、点击遮罩层自动关闭，不需要手动设置 visible
   * @default true
   */
  autoClose?: boolean;
  /**
   * 取消按钮文字
   * @default true
   */
  cancelBtn?: boolean | string;
  /**
   * 配置每一列的选项
   * @default []
   */
  columns: PickerColumn | Array<PickerColumn> | ((item: Array<PickerValue>) => Array<PickerColumn>);
  /**
   * 确定按钮文字
   * @default true
   */
  confirmBtn?: boolean | string;
  /**
   * 底部内容
   */
  footer?: TNode;
  /**
   * 自定义头部内容
   */
  header?: TNode;
  /**
   * 自定义选项内容。参数为 `option: PickerColumnItem, index: number`
   */
  option?: TNode;
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
   * 是否使用弹出层包裹
   * @default false
   */
  usePopup?: boolean;
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
   * 关闭时触发
   */
  onClose?: (trigger: TriggerSource) => void;
  /**
   * 点击确认按钮时触发
   * @default ''
   */
  onConfirm?: (value: Array<PickerValue>, context: { index: number[]; e: MouseEvent; label: string[] }) => void;
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

export type TriggerSource = 'overlay' | 'cancel-btn' | 'confirm-btn';
