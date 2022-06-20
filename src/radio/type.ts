/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdRadioProps {
  /**
   * 复选框和内容相对位置
   * @default left
   */
  align?: 'left' | 'right';
  /**
   * 是否选中
   * @default false
   */
  checked?: boolean;
  /**
   * 是否选中，非受控属性
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 单选内容
   */
  content?: string | TNode;
  /**
   * 是否禁用组件内容（content）触发选中
   */
  contentDisabled?: boolean;
  /**
   * 单选按钮内容，同 label
   */
  default?: string | TNode;
  /**
   * 是否为禁用态
   */
  disabled?: boolean;
  /**
   * 自定义选中图标和非选中图标。示例：[选中态图标地址，非选中态图标地址]。值为 fill-circle 表示图标为填充型图标，值为 stroke-line 表示图标为描边型图标
   * @default 'fill-circle'
   */
  icon?: 'fill-circle' | 'stroke-line' | Array<TNode>;
  /**
   * 主文案
   */
  label?: string | TNode;
  /**
   * HTML 元素原生属性
   * @default ''
   */
  name?: string;
  /**
   * 单选按钮的值
   * @default false
   */
  value?: RadioValue;
  /**
   * 选中状态变化时触发
   */
  onChange?: (checked: boolean, context: { e: Event }) => void;
}

export interface TdRadioGroupProps {
  /**
   * 是否禁用全部子单选框
   */
  disabled?: boolean;
  /**
   * HTML 元素原生属性
   * @default ''
   */
  name?: string;
  /**
   * 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同
   */
  options?: Array<RadioOption>;
  /**
   * 选中的值
   * @default false
   */
  value?: RadioValue;
  /**
   * 选中的值，非受控属性
   * @default false
   */
  defaultValue?: RadioValue;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (value: RadioValue, context: { e: Event }) => void;
}

export type RadioValue = string | number | boolean;

export type RadioOption = string | number | RadioOptionObj;

export interface RadioOptionObj {
  label?: string | TNode;
  value?: string | number;
  disabled?: boolean;
}
