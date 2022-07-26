import { ImageProps } from '../image';
import { TNode } from '../common';

export interface TdResultProps {
  /**
   * 描述文字
   */
  description?: string | TNode;

  /**
   * 图标名称
   * @default ''
   */
  icon?: string | TNode;
  /**
   * 图片地址
   */
  image?: string | TNode;
  /**
   * 标题
   * @default ''
   */
  title?: string | TNode;
  /**
   * 内置主题
   * @default default
   */
  theme?: 'default' | 'success' | 'warning' | 'error';
  /**
   * 透传 Image 组件全部属性
   */
  imageProps?: ImageProps;
}
