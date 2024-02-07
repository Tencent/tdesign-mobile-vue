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
   * 背景
   * @default ''
   */
  background?: string;
  /**
   * 是否固定在顶部
   * @default true
   */
  fixed?: boolean;
  /**
   * 左侧区域。值为 `string` 表示文本，为其他表示自定义内容
   */
  left?: string | TNode;
  /**
   * 是否显示左侧箭头
   * @default false
   */
  leftArrow?: boolean;
  /**
   * 右侧区域。值为 `string` 表示文本，为其他表示自定义内容
   */
  right?: string | TNode;
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
