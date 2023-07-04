/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { ButtonProps } from '../button';
import { TNode } from '../common';

export interface TdFabProps {
  /**
   * 透传至 Button 组件
   */
  buttonProps?: ButtonProps;
  /**
   * 图标
   */
  icon?: TNode;
  /**
   * 悬浮按钮的样式，常用于调整位置
   * @default right: 16px; bottom: 32px;
   */
  style?: string;
  /**
   * 文本内容
   * @default ''
   */
  text?: string;
  /**
   * 悬浮按钮点击事件
   */
  onClick?: (context: { e: MouseEvent }) => void;
}
