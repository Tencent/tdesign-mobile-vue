/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdNoticeBarProps {
  /**
   * 文本内容
   */
  content?: string | string[] | TNode;
  /**
   * 滚动方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放
   * @default false
   */
  marquee?: boolean | NoticeBarMarquee;
  /**
   * 右侧额外信息
   */
  operation?: string | TNode;
  /**
   * 用于自定义公告栏前面的图标，优先级大于 theme 设定的图标。值为 false 则不显示图标，值为 true 显示 theme 设定图标
   * @default true
   */
  prefixIcon?: Boolean | TNode;
  /**
   * 后缀图标
   */
  suffixIcon?: TNode;
  /**
   * 内置主题
   * @default info
   */
  theme?: 'info' | 'success' | 'warning' | 'error';
  /**
   * 显示/隐藏
   * @default false
   */
  visible?: boolean;
  /**
   * 显示/隐藏，非受控属性
   * @default false
   */
  defaultVisible?: boolean;
  /**
   * 显示/隐藏
   * @default false
   */
  modelValue?: boolean;
  /**
   * 点击事件
   */
  onClick?: (trigger: NoticeBarTrigger) => void;
}

export interface NoticeBarMarquee {
  speed?: number;
  loop?: number;
  delay?: number;
}

export type NoticeBarTrigger = 'prefix-icon' | 'content' | 'operation' | 'suffix-icon';
