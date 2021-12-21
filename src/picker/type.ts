/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-16 09:17:45
 * */

export interface TdPickerProps {
  /**
   * 取消按钮文字
   * @default 取消
   */
  cancelBtn: string;
  /**
   * 确定按钮文字
   * @default 确认
   */
  confirmBtn: string;
  /**
   * 标题
   * @default ''
   */
  title: string;
  /**
   * 选中值
   */
  modelValue: Array<PickerValue>;
  /**
   * 选中值，非受控属性
   */
  defaultValue: Array<PickerValue>;
  /**
   * 是否显示
   * @default false
   */
  visible: boolean;
  /**
   * 点击取消按钮时触发
   * @default ''
   */
  onCancel: ({ e: MouseEvent }) => void;
  /**
   * 选中变化时候触发
   * @default ''
   */
  onChange: (value: Array<PickerValue>) => void;
  /**
   * 点击确认确认按钮时触发
   * @default ''
   */
  onConfirm: ({ e: MouseEvent }) => void;
}

export interface TdPickerItemProps {
  /**
   * 数据源
   * @default []
   */
  options: Array<PickerItemOption>;
  /**
   * 默认选中的侯选项
   */
  value: string | number;
  /**
   * 格式化选项
   * @default (value: string): string => value
   */
  formatter: Function;
}

export type PickerValue = string | number;
export type PickerItemOptionObject = { label: string; value: string | number };
export type PickerItemOption = PickerItemOptionObject | string | number;
