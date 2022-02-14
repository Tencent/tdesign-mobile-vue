/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdGridProps {
  /**
   * 内容对齐方式
   * @default center
   */
  align?: 'left' | 'center';
  /**
   * 边框，默认不显示。值为 true 则显示默认边框，值类型为 object 则表示自定义边框样式
   * @default false
   */
  border?: boolean | { color?: string; width?: string; style?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'inset' | 'outset' };
  /**
   * 每一行的列数量
   * @default 4
   */
  column?: number;
  /**
   * 间隔大小
   */
  gutter?: number;
}

export interface TdGridItemProps {
  /**
   * 文本以外的更多描述，辅助信息。可以通过 Props 传入文本，也可以自定义标题节点
   */
  description?: string | TNode;
  /**
   * 图片，可以是图片地址，也可以自定义图片节点
   */
  image?: string | TNode;
  /**
   * 内容布局方式
   * @default vertical
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * 文本，可以通过 Props 传入文本，也可以自定义标题节点
   */
  text?: string | TNode;
}
