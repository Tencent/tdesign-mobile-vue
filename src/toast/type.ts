/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdToastProps {
  /**
   * 图标排列方式
   * @default row
   */
  direction?: 'row' | 'column';
  /**
   * 弹窗显示毫秒数
   * @default 2000
   */
  duration?: number;
  /**
   * 自定义图标
   */
  icon?: string | TNode;
  /**
   * 弹窗显示文字
   */
  message?: string | TNode;
  /**
   * 遮罩层属性，透传至 Overlay
   * @default {}
   */
  overlayProps?: object;
  /**
   * 弹窗展示位置
   * @default middle
   */
  placement?: 'top' | 'middle' | 'bottom';
  /**
   * 防止滚动穿透，即不允许点击和滚动
   * @default false
   */
  preventScrollThrough?: boolean;
  /**
   * 是否显示遮罩层
   * @default false
   */
  showOverlay?: boolean;
  /**
   * 提示类型
   */
  theme?: 'loading' | 'success' | 'fail';
}
