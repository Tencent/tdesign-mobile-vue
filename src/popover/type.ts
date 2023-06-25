/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdPopoverProps {
  /**
   * 确认框内容
   */
  content?: string | TNode;
  /**
   * 触发元素，同 triggerElement
   */
  default?: string | TNode;
  /**
   * 浮层出现位置
   * @default top
   */
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom';
  /**
   * 是否显示浮层箭头
   * @default true
   */
  showArrow?: boolean;
  /**
   * 弹出气泡主题。
   * @default dark
   */
  theme?: 'dark' | 'light' | 'brand' | 'success' | 'warning' | 'error';
  /**
   * 触发元素
   */
  triggerElement?: string | TNode;
  /**
   * 是否显示气泡确认框
   */
  visible?: boolean;
  /**
   * 是否显示气泡确认框，非受控属性
   */
  defaultVisible?: boolean;
  /**
   * 是否显示气泡确认框
   */
  modelValue?: boolean;
  /**
   * 确认框显示或隐藏时触发
   */
  onVisibleChange?: (visible: boolean) => void;
}
