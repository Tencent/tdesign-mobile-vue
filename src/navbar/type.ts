/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdNavbarProps {
  /**
   * 是否添加动画效果
   * @default true
   */
  animation?: boolean;
  /**
   * 左侧胶囊区域
   */
  capsule?: TNode;
  /**
   * 是否固定在顶部
   * @default true
   */
  fixed?: boolean;
  /**
   * 左侧区域
   */
  left?: TNode;
  /**
   * 是否展示左侧箭头
   * @default false
   */
  leftArrow?: boolean;
  /**
   * 右侧区域
   */
  right?: TNode;
  /**
   * 页面标题
   */
  title?: string | TNode;
  /**
   * 标题文字最大长度，超出的范围使用 `...` 表示
   */
  titleMaxLength?: number;
  /**
   * 是否显示
   * @default true
   */
  visible?: boolean;
  /**
   * 点击左侧区域时触发
   */
  onLeftClick?: () => void;
  /**
   * 点击右侧区域时触发
   */
  onRightClick?: () => void;
}
