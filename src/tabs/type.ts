/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-16 09:37:49
 * */

import { TNode } from '../common';

export interface TdTabsProps {
  /**
   * 动画效果设置。其中 duration 表示动画时长
   */
  animation: TabAnimation;
  /**
   * 选项卡列表
   */
  list: Array<TdTabPanelProps>;
  /**
   * 选项卡位置
   * @default top
   */
  placement: 'left' | 'right' | 'top' | 'bottom';
  /**
   * 是否展示底部激活线条
   * @default true
   */
  showBottomLine: boolean;
  /**
   * 组件尺寸
   * @default medium
   */
  size: 'medium' | 'large';
  /**
   * 激活的选项卡值
   */
  value: TabValue;
  /**
   * 激活的选项卡值，非受控属性
   */
  defaultValue: TabValue;
  /**
   * 激活的选项卡发生变化时触发
   */
  onChange: (value: TabValue) => void;
};

export interface TdTabPanelProps {
  /**
   * 选项卡内容隐藏时是否销毁
   * @default true
   */
  destroyOnHide: boolean;
  /**
   * 是否禁用当前选项卡
   * @default false
   */
  disabled: boolean;
  /**
   * 选项卡名称，可自定义选项卡导航内容
   */
  label: string | TNode;
  /**
   * 用于自定义选项卡面板内容
   */
  panel: string | TNode;
  /**
   * 选项卡的值，唯一标识
   */
  value: TabValue;
};

export type TabAnimation = { duration: number } & Record<string, any>;

export type TabValue = string | number;
