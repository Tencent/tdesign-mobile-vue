/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-30 21:24:46
 * */

import { TNode } from '../common';

export interface TdToastProps {
  /**
   * 图标排列方式
   */
  direction: 'row' | 'column';
  /**
   * 弹窗显示毫秒数
   * @default 2000
   */
  duration: number;
  /**
   * 自定义图标
   */
  icon: TNode;
  /**
   * 弹窗显示文字
   * @default ''
   */
  message: string;
  /**
   * 弹窗展示位置
   * @default middle
   */
  position: 'top' | 'middle' | 'bottom';
  /**
   * 是否显示背景遮罩，禁止背景点击和滚动
   */
  showOverlay: boolean;
  /**
   * 提示类型
   */
  type: 'loading' | 'success' | 'fail';
}
