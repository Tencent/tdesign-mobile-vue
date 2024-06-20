/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { TNode } from '../common';
import { TdBadgeProps } from '../badge/type';
export interface TdActionSheetProps {
  /**
   * 水平对齐方式
   * @default center
   */
  align?: 'center' | 'left';
  /**
   * 设置取消按钮的文本
   * @default ''
   */
  cancelText?: string;
  /**
   * 设置每页展示菜单的数量，仅当 type=grid 时有效
   * @default 8
   */
  count?: number;
  /**
   * 动作面板描述文字
   * @default ''
   */
  description?: string;
  /**
   * 菜单项
   */
  items?: Array<string | ActionSheetItem>;
  /**
   * 是否显示取消按钮
   * @default true
   */
  showCancel?: boolean;
  /**
   * 展示类型，列表和表格形式展示
   * @default list
   */
  theme?: 'list' | 'grid';
  /**
   * 显示与隐藏
   * @default false
   */
  visible: boolean;
  /**
   * 显示与隐藏，非受控属性
   * @default false
   */
  defaultVisible: boolean;
  /**
   * 显示与隐藏
   * @default false
   */
  modelValue: boolean;
  /**
   * 点击取消按钮时触发
   */
  onCancel?: (context: { e: MouseEvent }) => void;
  /**
   * 关闭时触发
   */
  onClose?: (trigger: ActionSheetTriggerSource) => void;
  /**
   * 选择菜单项时触发
   */
  onSelected?: (selected: ActionSheetItem | string, index: number) => void;
}

export interface ActionSheetItem {
  label: string;
  color?: string;
  disabled?: boolean;
  icon?: TNode;
  badge?: TdBadgeProps;
}

export type ActionSheetTriggerSource = 'overlay' | 'command' | 'select';
