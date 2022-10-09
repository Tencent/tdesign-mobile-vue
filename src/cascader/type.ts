/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { TNode } from '../common';

export interface TdCascaderProps {
  /**
   * 选中值
   */
  value?: TdCascaderItemValueType;
  /**
   * 选中值，非受控属性
   */
  defaultValue?: TdCascaderItemValueType;
  /**
   * 选项数据
   */
  options?: TdCascaderItems;
  /**
   * 关闭 icon 图标
   */
  closeIcon?: boolean | TNode;
  /**
   * 标题
   */
  title?: string | TNode;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 值改变时触发
   */
  onChange?: (value: TdCascaderItemValueType, context: { e: MouseEvent }) => void;
  /**
   * 选中选项时触发
   */
  onPick?: (context: { e: MouseEvent }) => void;
  /**
   * 关闭 Cascader 触发
   */
  onCancel?: (context: { e: MouseEvent }) => void;
  /**
   * 点击进度 Tab 触发
   */
  onClickTab?: (context: { e: MouseEvent }) => void;
}

export interface TdCascaderItem {
  label: string;
  value: TdCascaderItemValueType;
  active?: boolean;
  disabled?: boolean;
  index?: string;
  leaf?: boolean;
  parent?: TdCascaderItem;
  children?: TdCascaderItems;
  [key: string]: any;
  selected?: boolean;
}

export type TdCascaderItems = Array<TdCascaderItem>;
export type TdCascaderItemValueType = string | number;
