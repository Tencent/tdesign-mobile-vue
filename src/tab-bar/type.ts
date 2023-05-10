/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { BadgeProps } from '../badge';
import { TNode } from '../common';

export interface TdTabBarProps {
  /**
   * 是否显示外边框
   * @default true
   */
  bordered?: boolean;
  /**
   * 是否固定在底部
   * @default true
   */
  fixed?: boolean;
  /**
   * 是否为 iPhoneX 留出底部安全距离
   * @default true
   */
  safeAreaInsetBottom?: boolean;
  /**
   * 标签栏的形状
   * @default 'normal'
   */
  shape?: 'normal' | 'round';
  /**
   * 是否需要分割线
   * @default true
   */
  split?: boolean;
  /**
   * 选项风格
   * @default 'normal'
   */
  theme?: 'normal' | 'tag';
  /**
   * 当前选中标签的索引
   */
  value?: string | number | Array<string | number>;
  /**
   * 当前选中标签的索引，非受控属性
   */
  defaultValue?: string | number | Array<string | number>;
  /**
   * 当前选中标签的索引
   */
  modelValue?: string | number | Array<string | number>;
  /**
   * 选中标签切换时触发
   */
  onChange?: (value: string | number) => void;
}

export interface TdTabBarItemProps {
  /**
   * 图标右上角提示信息
   */
  badgeProps?: BadgeProps;
  /**
   * 图标名称
   */
  icon?: TNode;
  /**
   * 二级菜单
   */
  subTabBar?: SubTabBarItem[];
  /**
   * 标识符
   */
  value?: string | number;
}

export interface SubTabBarItem {
  value: string;
  label: string;
}
