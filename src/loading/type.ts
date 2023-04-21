/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdLoadingProps {
  /**
   * 子元素
   */
  content?: string | TNode;
  /**
   * 子元素，同 content
   */
  default?: string | TNode;
  /**
   * 延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒
   * @default 0
   */
  delay?: number;
  /**
   * 加载动画执行完成一次的时间，单位：毫秒
   * @default 800
   */
  duration?: number;
  /**
   * 是否显示加载指示符
   * @default true
   */
  indicator?: boolean;
  /**
   * 是否继承父元素颜色
   * @default false
   */
  inheritColor?: boolean;
  /**
   * 对齐方式
   * @default horizontal
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 是否处于加载状态
   * @default true
   */
  loading?: boolean;
  /**
   * 是否暂停动画
   * @default false
   */
  pause?: boolean;
  /**
   * 加载进度
   */
  progress?: number;
  /**
   * 加载动画是否反向
   */
  reverse?: boolean;
  /**
   * 尺寸，示例：20px
   * @default '20px'
   */
  size?: string;
  /**
   * 加载提示文案
   */
  text?: string | TNode;
  /**
   * 加载组件类型
   * @default circular
   */
  theme?: 'circular' | 'spinner' | 'dots';
}
