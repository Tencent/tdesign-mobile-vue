/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdImageViewerProps {
  /**
   * 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以完全自定义关闭按钮
   * @default true
   */
  closeBtn?: boolean | TNode;
  /**
   * 支持自定义覆盖在图片预览最上方的内容
   */
  cover?: TNode;
  /**
   * 是否显示删除操作，前提需要开启页码
   * @default false
   */
  deleteBtn?: boolean | TNode;
  /**
   * 自定义图片内容
   */
  image?: TNode<ImageSlotParams>;
  /**
   * 图片数组
   * @default []
   */
  images?: Array<string | ImageInfo>;
  /**
   * 当前预览图片所在的下标
   */
  index?: number;
  /**
   * 当前预览图片所在的下标，非受控属性
   */
  defaultIndex?: number;
  /**
   * 【开发中】最大放大比例
   * @default 3
   */
  maxZoom?: number;
  /**
   * 是否显示页码
   * @default false
   */
  showIndex?: boolean;
  /**
   * 隐藏/显示预览
   * @default false
   */
  visible?: boolean;
  /**
   * 隐藏/显示预览，非受控属性
   * @default false
   */
  defaultVisible?: boolean;
  /**
   * 隐藏/显示预览
   * @default false
   */
  modelValue?: boolean;
  /**
   * 关闭时触发
   */
  onClose?: (context: { trigger: ImageViewerCloseTrigger; visible: boolean; index: number }) => void;
  /**
   * 点击删除操作按钮时触发
   */
  onDelete?: (index: number) => void;
  /**
   * 预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片
   */
  onIndexChange?: (index: number, context: { trigger: 'prev' | 'next' }) => void;
}

export interface ImageSlotParams {
  src: string;
  className?: string;
  style?: string;
  onLoad?: (e: Event) => void;
  onTransitionstart?: (e: TransitionEvent) => void;
  onTransitionend?: (e: TransitionEvent) => void;
}

export interface ImageInfo {
  url: string;
  align: 'start' | 'center' | 'end';
}

export type ImageViewerCloseTrigger = 'image' | 'overlay' | 'close-btn';
