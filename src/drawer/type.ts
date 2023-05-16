/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, Styles, AttachNode } from '../common';

export interface TdDrawerProps {
  /**
   * 抽屉挂载的节点，默认挂在组件本身的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body
   */
  attach?: AttachNode;
  /**
   * 点击蒙层时是否触发抽屉关闭事件
   */
  closeOnOverlayClick?: boolean;
  /**
   * 抽屉关闭时是否销毁节点
   * @default false
   */
  destroyOnClose?: boolean;
  /**
   * 抽屉的底部
   */
  footer?: TNode;
  /**
   * 抽屉里的列表项
   */
  items?: DrawerItem[];
  /**
   * 抽屉方向
   * @default right
   */
  placement?: 'left' | 'right';
  /**
   * 是否显示遮罩层
   * @default true
   */
  showOverlay?: boolean;
  /**
   * 抽屉的标题
   */
  title?: string | TNode;
  /**
   * 组件是否可见
   * @default false
   */
  visible?: boolean;
  /**
   * 抽屉层级，样式默认为 1500
   */
  zIndex?: number;
  /**
   * 关闭时触发
   */
  onClose?: (trigger: TriggerSource) => void;
  /**
   * 点击抽屉里的列表项
   */
  onItemClick?: (index: number, item: DrawerItem, context: { e: MouseEvent }) => void;
  /**
   * 如果蒙层存在，点击蒙层时触发
   */
  onOverlayClick?: (context: { e: MouseEvent }) => void;
}

export interface DrawerOptions extends Omit<TdDrawerProps, 'attach'> {
  /**
   * 抽屉类名，示例：'t-class-drawer-first t-class-drawer-second'
   * @default ''
   */
  className?: string;
  /**
   * 弹框 style 属性，输入 [CSSStyleDeclaration.cssText](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/cssText)
   */
  style?: string | Styles;
}

export interface DrawerInstance {
  /**
   * 销毁抽屉
   */
  destroy?: () => void;
  /**
   * 隐藏抽屉
   */
  hide?: () => void;
  /**
   * 显示抽屉
   */
  show?: () => void;
  /**
   * 更新抽屉内容
   */
  update?: (props: DrawerOptions) => void;
}

export interface DrawerItem {
  title: string;
  icon: TNode;
}

export type TriggerSource = 'overlay';

export type DrawerMethod = (options?: DrawerOptions) => void;
