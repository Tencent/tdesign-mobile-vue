/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdMessageProps {
  /**
   * 文本对齐方式
   * @default left
   */
  align?: MessageAlignType;
  /**
   * 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。也可以完全自定义按钮
   */
  closeBtn?: string | boolean | TNode;
  /**
   * 用于自定义消息弹出内容
   */
  content?: string | TNode;
  /**
   * 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。
   * @default 3000
   */
  duration?: number;
  /**
   * 用于自定义消息前面的图标，优先级大于 theme 设定的图标。值为 false 则不显示图标，值为 true 显示 theme 设定图标
   * @default true
   */
  icon?: boolean | TNode;
  /**
   * 链接名称。值为字符串表示链接名称，值为 Object 类型，表示透传至 Link
   */
  link?: string | object | TNode;
  /**
   * 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放
   * @default false
   */
  marquee?: boolean | DrawMarquee;
  /**
   * 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10rpx', '8rpx']
   */
  offset?: Array<string | number>;
  /**
   * 消息组件风格
   * @default info
   */
  theme?: MessageThemeList;
  /**
   * 是否显示，隐藏时默认销毁组件
   * @default false
   */
  visible?: boolean;
  /**
   * 是否显示，隐藏时默认销毁组件，非受控属性
   * @default false
   */
  defaultVisible?: boolean;
  /**
   * 是否显示，隐藏时默认销毁组件
   * @default false
   */
  modelValue?: boolean;
  /**
   * 元素层级，样式默认为 5000
   */
  zIndex?: number;
  /**
   * 可见性变化时触发
   * @deprecated
   */
  onChange?: (visible: boolean) => void;
  /**
   * 关闭消息时触发
   * @deprecated
   */
  onClose?: (context: { trigger: 'close-click' | 'duration-end'; e?: MouseEvent }) => void;
  /**
   * 当关闭按钮存在时，用户点击关闭按钮触发
   */
  onCloseBtnClick?: (context: { e: MouseEvent }) => void;
  /**
   * 关闭消息并且动画结束后触发
   * @deprecated
   */
  onClosed?: () => void;
  /**
   * 计时结束后触发
   */
  onDurationEnd?: () => void;
  /**
   * 当link链接存在时，点击链接文本时触发
   */
  onLinkClick?: (context: { e: MouseEvent }) => void;
  /**
   * 展示Message时触发
   * @deprecated
   */
  onOpen?: () => void;
  /**
   * 展示Message时并且动画结束后触发
   * @deprecated
   */
  onOpened?: () => void;
}

export type MessageAlignType = 'left' | 'center';

export interface DrawMarquee {
  speed?: number;
  loop?: number;
  delay?: number;
}

export type MessageThemeList = 'info' | 'success' | 'warning' | 'error';
