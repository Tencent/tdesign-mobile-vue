/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdSwiperProps {
  /**
   * 轮播切换动画效果类型
   * @default slide
   */
  animation?: 'slide';
  /**
   * 是否自动播放
   * @default true
   */
  autoplay?: boolean;
  /**
   * 当前轮播在哪一项（下标）
   * @default 0
   */
  current?: number;
  /**
   * 当前轮播在哪一项（下标），非受控属性
   * @default 0
   */
  defaultCurrent?: number;
  /**
   * 当前轮播在哪一项（下标）
   * @default 0
   */
  modelValue?: number;
  /**
   * 轮播滑动方向，包括横向滑动和纵向滑动两个方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 滑动动画时长
   * @default 300
   */
  duration?: number;
  /**
   * 轮播的高度；默认单位 `px`
   * @default 192
   * @deprecated
   */
  height?: string | number;
  /**
   * 轮播间隔时间
   * @default 5000
   */
  interval?: number;
  /**
   * 是否循环播放
   * @default true
   */
  loop?: boolean;
  /**
   * 导航器全部配置
   */
  navigation?: SwiperNavigation | TNode;
  /**
   * 后边距偏移量，可用于露出后一项的一小部分。默认单位 `px`
   * @default 0
   */
  nextAffset?: string | number;
  /**
   * 前边距偏移量，可用于露出前一项的一小部分。默认单位 `px`
   * @default 0
   */
  previousAffset?: string | number;
  /**
   * 轮播切换时触发
   */
  onChange?: (current: number, context: { source: SwiperChangeSource }) => void;
  /**
   * 点击轮播项时触发
   */
  onClick?: (index: number) => void;
}

export interface SwiperNavigation {
  /**
   * 当前轮播在哪一项（下标）
   * @default 0
   */
  current?: number;
  /**
   * 小于这个数字不会显示导航器
   */
  minShowNum?: number;
  /**
   * 页码信息展示位置
   * @default bottom
   */
  paginationPosition?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
  /**
   * 导航器位置，位于主体的内侧或是外侧
   * @default inside
   */
  placement?: 'inside' | 'outside';
  /**
   * 是否显示两侧的控制按钮
   * @default false
   */
  showControls?: boolean;
  /**
   * 总共的项数
   * @default 0
   */
  total?: number;
  /**
   * 导航器类型，点状(dots)、点条状(dots-bar)、分式(fraction)等
   * @default dots
   */
  type?: SwiperNavigationType;
}

export type SwiperChangeSource = 'autoplay' | 'touch' | '';

export type SwiperNavigationType = 'dots' | 'dots-bar' | 'fraction';
