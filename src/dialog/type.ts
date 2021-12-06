/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-06 01:32:01
 * */

import { TdButtonProps } from '@Button';
import { ButtonProps } from '@Button';
import { TNode } from '../common';

export interface TdDialogProps {
  /**
   * 操作栏
   */
  actions: Array<TdButtonProps>;
  /**
   * 多按钮排列方式
   * @default horizontal
   */
  buttonLayout: 'horizontal' | 'vertical';
  /**
   * 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件
   * @default ''
   */
  cancelBtn: string | ButtonProps | TNode;
  /**
   * 点击蒙层时是否触发关闭事件
   * @default true
   */
  closeOnOverlayClick: boolean;
  /**
   * 确认按钮。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件
   * @default ''
   */
  confirmBtn: string | ButtonProps | TNode;
  /**
   * 内容
   */
  content: string | TNode;
  /**
   * 是否在关闭弹框的时候销毁子元素
   * @default false
   */
  destroyOnClose: boolean;
  /**
   * 防止滚动穿透
   * @default true
   */
  preventScrollThrough: boolean;
  /**
   * 是否显示遮罩层
   * @default true
   */
  showOverlay: boolean;
  /**
   * 标题
   */
  title: string | TNode;
  /**
   * 控制对话框是否显示
   * @default false
   */
  visible: boolean;
  /**
   * 控制对话框是否显示，非受控属性
   * @default false
   */
  defaultVisible: boolean;
  /**
   * 对话框宽度，示例：320, '500px', '80%'
   */
  width: string | number;
  /**
   * 对话框层级，Web 侧样式默认为 2500，移动端和小程序样式默认为 1500
   */
  zIndex: number;
  /**
   * 如果“取消”按钮存在，则点击“取消”按钮时触发，同时触发关闭事件
   */
  onCancel: (context: { e: MouseEvent }) => void;
  /**
   * 关闭事件，点击 取消按钮 或 点击蒙层 时触发
   */
  onClose: (context: DialogCloseContext) => void;
  /**
   * 如果“确认”按钮存在，则点击“确认”按钮时触发
   */
  onConfirm: (context: { e: MouseEvent }) => void;
  /**
   * 如果蒙层存在，点击蒙层时触发
   */
  onOverlayClick: (context: { e: MouseEvent }) => void;
}

export type DialogEventSource = 'cancel' | 'overlay';

export interface DialogCloseContext {
  trigger: DialogEventSource;
  e: MouseEvent;
}

export type DialogMethod = (options?: DialogOptions) => DialogInstance;

export type DialogConfirmMethod = (options?: DialogOptions) => DialogInstance;

export type DialogAlertMethod = (options?: Omit<DialogOptions, 'confirmBtn'>) => DialogInstance;
