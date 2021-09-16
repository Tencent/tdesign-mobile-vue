/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-27 17:26:31
 * */

import { TNode } from '../common';

export interface TdCellProps {
  /**
   * 内容的对齐方式，默认居中对齐
   * @default middle
   */
  align: 'top' | 'middle' | 'bottom';
  /**
   * 是否显示右侧箭头
   * @default false
   */
  arrow: boolean;
  /**
   * 是否显示下边框
   * @default true
   */
  bordered: boolean;
  /**
   * 下方内容描述
   */
  description: string | TNode;
  /**
   * 是否开启点击反馈
   */
  hover: boolean;
  /**
   * 左侧图标，出现在单元格标题的左侧
   */
  leftIcon: TNode;
  /**
   * 和标题同行的说明文字
   */
  note: string | TNode;
  /**
   * 是否显示表单必填星号
   * @default false
   */
  required: boolean;
  /**
   * 最右侧图标
   */
  rightIcon: TNode;
  /**
   * 标题
   */
  title: string | TNode;
  /**
   * 右侧内容
   */
  onClick: (context: { e: MouseEvent }) => void;
};
