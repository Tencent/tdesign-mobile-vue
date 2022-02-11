/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdImageProps {
  /**
   * 图片描述
   * @default ''
   */
  alt?: string;
  /**
   * 自定义加载失败状态下的图片内容
   */
  error?: TNode;
  /**
   * 图片填充模式
   * @default fill
   */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * 是否开启图片懒加载
   * @default false
   */
  lazy?: boolean;
  /**
   * 自定义加载中状态下的图片内容
   */
  loading?: TNode;
  /**
   * 等同于原生的 object-position 属性，可选值为 top right bottom left 或 string，可以自定义任何px或者百分比
   * @default center
   */
  position?: string;
  /**
   * 图片圆角类型
   * @default round
   */
  shape?: 'circle' | 'round' | 'square';
  /**
   * 图片链接
   * @default ''
   */
  src?: string;
  /**
   * 图片加载失败时触发
   */
  onError?: () => void;
  /**
   * 图片加载完成时触发
   */
  onLoad?: () => void;
}
