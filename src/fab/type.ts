/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ButtonProps } from '../button';
import { TNode, Styles } from '../common';

export interface TdFabProps {
  /**
   * 透传至 Button 组件
   */
  buttonProps?: ButtonProps;
  /**
   * 是否可拖拽。`true` / `'all'`可拖动<br>`'vertical'`可垂直拖动<br>`'horizontal'`可水平拖动<br>`false`禁止拖动
   * @default false
   */
  draggable?: boolean | FabDirectionEnum;
  /**
   * 图标
   */
  icon?: TNode;
  /**
   * 悬浮按钮的样式，常用于调整位置
   * @default 'right: 16px; bottom: 32px;'
   */
  style?: string | Styles;
  /**
   * 文本内容
   * @default ''
   */
  text?: string;
  /**
   * 设置垂直方向边界限制，示例：[48, 48] 或 ['96px', 80]
   */
  yBounds?: Array<string | number>;
  /**
   * 悬浮按钮点击事件
   */
  onClick?: (context: { e: MouseEvent }) => void;
  /**
   * 结束拖拽时触发
   */
  onDragEnd?: (context: { e: TouchEvent }) => void;
  /**
   * 开始拖拽时触发
   */
  onDragStart?: (context: { e: TouchEvent }) => void;
}

export type FabDirectionEnum = 'all' | 'vertical' | 'horizontal';
