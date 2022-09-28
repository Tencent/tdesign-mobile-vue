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
   * 首页图标。值为 true 表示显示默认返回图标，值为 false 表示不显示首页图标，值为其他表示自定义图标
   */
  homeIcon?: boolean | TNode;
  /**
   * 左侧图标。值为 true 表示显示默认返回图标，值为 false 表示不显示左侧图标，值为其他表示自定义图标
   * @default false
   */
  leftIcon?: boolean | TNode;
  /**
   * 右侧图标，可自定义
   */
  rightIcon?: TNode;
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
   * 点击 home 图标时触发
   */
  onHomeClick?: () => void;
  /**
   * 点击左边按钮时触发
   */
  onLeftClick?: () => void;
}
