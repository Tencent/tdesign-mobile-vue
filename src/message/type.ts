/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-09-19 22:44:54
 * */

import { TNode } from '../common';

export interface TdMessageProps {
  /**
   * 操作
   */
  action: string | TNode;
  /**
   * 文本对齐方式
   * @default left
   */
  align: 'left' | 'center';
  /**
   * 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。也可以完全自定义按钮
   */
  closeBtn: string | boolean | TNode;
  /**
   * 用于自定义消息弹出内容
   */
  content: string | TNode;
  /**
   * 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。
   * @default 3000
   */
  duration: number;
  /**
   * 消息提醒前面的图标。值为 true 则根据 theme 显示对应的图标，值为 false 则不显示图标。值为 'info' 或 'bell' 则显示组件内置图标。也可以完全自定义图标节点
   * @default true
   */
  icon: boolean | 'info' | 'bell';
  /**
   * 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放
   * @default false
   */
  marquee: boolean | DrawMarquee;
  /**
   * 消息组件风格
   * @default info
   */
  theme: MessageThemeList;
  /**
   * 是否显示，隐藏时默认销毁组件
   * @default false
   */
  visible: boolean;
  /**
   * 元素层级，样式默认为 5000
   */
  zIndex: number;
  /**
   * 当操作按钮存在时，用户点击操作按钮时触发
   */
  onActionBtnClick: (context: { e: MouseEvent }) => void;
  /**
   * 当关闭按钮存在时，用户点击关闭按钮触发
   */
  onCloseBtnClick: (context: { e: MouseEvent }) => void;
  /**
   * 计时结束后触发
   */
  onDurationEnd: () => void;
};

export interface MessageOptions extends TdMessageProps {
  /**
   * 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10em', '8rem']
   */
  offset: Array<string | number>;
  /**
   * 弹出消息位置
   * @default top
   */
  placement: MessagePlacementList;
  /**
   * 消息层级
   * @default 5000
   */
  zIndex: number;
};

export interface DrawMarquee { speed?: number; loop?: number; delay?: number };

export type MessageThemeList = 'info' | 'success' | 'warning' | 'error';

export type MessagePlacementList = 'center' | 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface MessageInstance { close: () => void };

export type MessageMethod = (theme: MessageThemeList, message: string | MessageOptions, duration?: number) => Promise<MessageInstance>;

export type MessageInfoOptions = Omit<MessageOptions, 'theme'>;

export type MessageInfoMethod = (message: string | MessageInfoOptions, duration?: number) => Promise<MessageInstance>;

export type MessageErrorMethod = (message: string | MessageInfoOptions, duration?: number) => Promise<MessageInstance>;

export type MessageWarningMethod = (message: string | MessageInfoOptions, duration?: number) => Promise<MessageInstance>;

export type MessageSuccessMethod = (message: string | MessageInfoOptions, duration?: number) => Promise<MessageInstance>;

export type MessageLoadingMethod = (message: string | MessageInfoOptions, duration?: number) => Promise<MessageInstance>;

export type MessageQuestionMethod = (message: string | MessageInfoOptions, duration?: number) => Promise<MessageInstance>;

export type MessageCloseAllMethod = () => void;
