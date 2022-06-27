/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdSearchProps {
  /**
   * 自定义右侧操作按钮文字
   * @default ''
   */
  action?: string | TNode;
  /**
   * 是否居中
   * @default false
   */
  center?: boolean;
  /**
   * 是否可清空
   * @default true
   */
  clearable?: boolean;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否聚焦
   * @default false
   */
  focus?: boolean;
  /**
   * 左侧文本
   * @default ''
   */
  label?: string;
  /**
   * 左侧图标
   */
  leftIcon?: TNode;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 搜索框形状
   * @default 'square'
   */
  shape?: 'square' | 'round';
  /**
   * 值
   * @default ''
   */
  value?: string;
  /**
   * 值，非受控属性
   * @default ''
   */
  defaultValue?: string;
  /**
   * 值
   * @default ''
   */
  modelValue?: string;
  /**
   * 点击右侧操作按钮文字时触发时触发
   * @default ''
   */
  onActionClick?: (context: { e: MouseEvent }) => void;
  /**
   * 失去焦点时触发
   * @default ''
   */
  onBlur?: (value: string, context: { e: FocusEvent }) => void;
  /**
   * 值发生变化时触发
   * @default ''
   */
  onChange?: (value: string, context?: { e?: InputEvent | MouseEvent }) => void;
  /**
   * 点击清除时触发
   * @default ''
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 获得焦点时触发
   * @default ''
   */
  onFocus?: (value: string, context: { e: FocusEvent }) => void;
  /**
   * 提交时触发
   * @default ''
   */
  onSubmit?: (value: string, context: { e: KeyboardEvent }) => void;
}
