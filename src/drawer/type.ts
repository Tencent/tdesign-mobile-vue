/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ButtonProps } from '../button';
import { TNode, AttachNode } from '../common';

export interface TdDrawerProps {
  // /**
  //  * 抽屉挂载的节点，默认挂在组件本身的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body
  //  * @default ''
  //  */
  // attach?: AttachNode;
  // /**
  //  * 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件
  //  * @default ''
  //  */
  // cancelBtn?: FooterButton;
  // /**
  //  * 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例
  //  * @default true
  //  */
  // closeBtn?: string | boolean | TNode;
  // /**
  //  * 点击蒙层时是否触发抽屉关闭事件
  //  * @default true
  //  */
  // closeOnOverlayClick?: boolean;
  // /**
  //  * 确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件
  //  * @default ''
  //  */
  // confirmBtn?: FooterButton;
  // /**
  //  * 抽屉关闭时是否销毁节点
  //  * @default false
  //  */
  // destroyOnClose?: boolean;
  /**
   * 抽屉里的列表项
   */
  items?: DrawerItem[];
  // /**
  //  * 展开方式，有两种：直接展示在内容上方 和 推开内容区域
  //  * @default overlay
  //  */
  // mode?: 'overlay' | 'push';
  /**
   * 抽屉方向
   * @default right
   */
  placement?: 'left' | 'right' | 'top' | 'bottom';
  // /**
  //  * 仅在挂载元素中显示抽屉，默认在浏览器可视区域显示。父元素需要有定位属性，如：position: relative
  //  * @default false
  //  */
  // showInAttachedElement?: boolean;
  /**
   * 是否显示遮罩层
   * @default true
   */
  showOverlay?: boolean;
  // /**
  //  * 尺寸，支持 'small', 'medium', 'large'，'35px', '30%',  '3em' 等。纵向抽屉调整的是抽屉宽度，横向抽屉调整的是抽屉高度
  //  * @default small
  //  */
  // size?: string;
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
   * 关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发
   */
  onClose?: (context: DrawerCloseContext) => void;
  /**
   * 点击抽屉里的列表项
   */
  onItemClick?: (index: number, item: DrawerItem, context: { e: MouseEvent }) => void;
  /**
   * 如果蒙层存在，点击蒙层时触发
   */
  onOverlayClick?: (context: { e: MouseEvent }) => void;
}

export type FooterButton = string | ButtonProps | TNode;

export interface DrawerItem {
  title: string;
  icon: TNode;
}

export type DrawerEventSource = 'esc' | 'close-btn' | 'cancel' | 'overlay';

export interface DrawerCloseContext {
  trigger: DrawerEventSource;
  e: MouseEvent | KeyboardEvent;
}
