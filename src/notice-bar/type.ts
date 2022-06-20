/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdNoticeBarProps {
  /**
   * 文本内容
   */
  content?: string | TNode;
  /**
   * 右侧额外信息
   */
  extra?: string | TNode;
  /**
   * 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放
   * @default false
   */
  marquee?: boolean | DrawMarquee;
  /**
   * 前缀图标
   */
  prefixIcon?: string | TNode;
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
   * 展示或关闭公告栏时触发。参数为true时，代表展示公告栏。参数为false时，代表关闭公告栏
   */
  onChange?: (value: boolean) => void;
  /**
   * 点击事件
   */
  onClick?: (trigger: NoticeBarTrigger) => void;
}

export interface DrawMarquee {
  speed?: number;
  loop?: number;
  delay?: number;
}

export type NoticeBarTrigger = 'prefix-icon' | 'content' | 'extra' | 'suffix-icon';
