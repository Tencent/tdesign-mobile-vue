/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-06 13:58:33
 * */

 import { TNode } from '../common';

export interface TdMessageProps {
  /**
   * 文本对齐方式
   * @default left
   */
  align: MessageAlignType;
  /**
   * 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。也可以完全自定义按钮
   */
   closeBtn: string | boolean | TNode;
  /**
   * 用于自定义消息弹出内容
   * @default ''
   */
  content: string;
  /**
   * 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。
   * @default 3000
   */
  duration: number;
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
   * 关闭Message时触发
   */
  onClose: () => void;
  /**
   * 关闭Message时并且动画结束后触发
   */
  onClosed: () => void;
  /**
   * 展示Message时触发
   */
  onOpen: () => void;
  /**
   * 展示Message时并且动画结束后触发
   */
  onOpened: () => void;
  /**
   * 可见性变化时触发
   */
  onVisibleChange: (visible: boolean) => void;
}

export type MessageAlignType = 'left' | 'center';

export type MessageThemeList = 'info' | 'success' | 'warning' | 'error';
