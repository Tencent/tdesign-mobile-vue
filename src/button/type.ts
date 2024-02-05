/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, SizeEnum } from '../common';

export interface TdButtonProps {
  /**
   * 是否为块级元素
   * @default false
   */
  block?: boolean;
  /**
   * 按钮内容
   */
  content?: string | TNode;
  /**
   * 禁用状态
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否为幽灵按钮（镂空按钮）
   * @default false
   */
  ghost?: boolean;
  /**
   * 按钮内部图标，可完全自定义
   */
  icon?: TNode;
  /**
   * 是否显示为加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * 按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形
   * @default rectangle
   */
  shape?: 'rectangle' | 'square' | 'round' | 'circle';
  /**
   * 组件尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 右侧内容，可用于定义右侧图标
   */
  suffix?: TNode;
  /**
   * 组件风格，依次为品牌色、危险色
   * @default default
   */
  theme?: 'default' | 'primary' | 'danger' | 'light';
  /**
   * 按钮类型
   * @default button
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * 按钮形式，基础、线框、文字
   * @default base
   */
  variant?: 'base' | 'outline' | 'dashed' | 'text';
  /**
   * 点击时触发
   */
  onClick?: (e: MouseEvent) => void;
}
