/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDialogProps } from './type';
import { PropType } from 'vue';

export default {
  /** 操作栏 */
  actions: {
    type: [Array, Function] as PropType<TdDialogProps['actions']>,
  },
  /** 多按钮排列方式 */
  buttonLayout: {
    type: String as PropType<TdDialogProps['buttonLayout']>,
    default: 'horizontal' as TdDialogProps['buttonLayout'],
    validator(val: TdDialogProps['buttonLayout']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件 */
  cancelBtn: {
    type: [String, Object, Function] as PropType<TdDialogProps['cancelBtn']>,
  },
  /** 点击蒙层时是否触发关闭事件 */
  closeOnOverlayClick: {
    type: Boolean,
    default: undefined,
  },
  /** 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件 */
  confirmBtn: {
    type: [String, Object, Function] as PropType<TdDialogProps['confirmBtn']>,
  },
  /** 内容 */
  content: {
    type: [String, Function] as PropType<TdDialogProps['content']>,
  },
  /** 是否在关闭弹框的时候销毁子元素 */
  destroyOnClose: Boolean,
  /** 透传至 Overlay 组件 */
  overlayProps: {
    type: Object as PropType<TdDialogProps['overlayProps']>,
    default: () => ({}),
  },
  /** 防止滚动穿透 */
  preventScrollThrough: {
    type: Boolean,
    default: true,
  },
  /** 是否显示遮罩层 */
  showOverlay: {
    type: Boolean,
    default: true,
  },
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdDialogProps['title']>,
  },
  /** 控制对话框是否显示 */
  visible: Boolean,
  /** 对话框宽度，示例：320, '500px', '80%' */
  width: {
    type: [String, Number] as PropType<TdDialogProps['width']>,
  },
  /** 对话框层级，Web 侧样式默认为 2500，移动端和小程序样式默认为 1500 */
  zIndex: {
    type: Number,
  },
  /** 如果“取消”按钮存在，则点击“取消”按钮时触发，同时触发关闭事件 */
  onCancel: Function as PropType<TdDialogProps['onCancel']>,
  /** 关闭事件，点击 取消按钮 或 点击蒙层 时触发 */
  onClose: Function as PropType<TdDialogProps['onClose']>,
  /** 如果“确认”按钮存在，则点击“确认”按钮时触发 */
  onConfirm: Function as PropType<TdDialogProps['onConfirm']>,
  /** 如果蒙层存在，点击蒙层时触发 */
  onOverlayClick: Function as PropType<TdDialogProps['onOverlayClick']>,
};
