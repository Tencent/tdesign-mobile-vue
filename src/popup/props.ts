/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdPopupProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否锁定内容滚动 */
  lockScroll: {
    type: Boolean,
    default: true,
  },
  /** 浮层出现位置 */
  placement: {
    type: String as PropType<TdPopupProps['placement']>,
    default: 'top' as TdPopupProps['placement'],
    validator(val: TdPopupProps['placement']): boolean {
      return ['top', 'left', 'right', 'bottom', 'center'].includes(val!);
    },
  },
  /** 是否显示遮罩层 */
  showOverlay: {
    type: Boolean,
    default: true,
  },
  /** 透传给teleport组件的to属性 */
  to: String,
  /** 弹出层内容区的动画名，等价于transition组件的name属性 */
  transitionName: {
    type: String,
    default: '',
  },
  /** 是否显示浮层 */
  visible: {
   type: Boolean,
   default: undefined
  },
  modelValue: {
   type: Boolean,
   default: undefined
  },
  /** 是否显示浮层，非受控属性 */
  defaultVisible: {
   type: Boolean,
   default: undefined
  },
  /** 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 */
  zIndex: {
    type: Number,
  },
  /** 组件准备关闭时触发 */
  onClose: Function as PropType<TdPopupProps['onClose']>,
  /** 组件关闭且动画结束后执行 */
  onClosed: Function as PropType<TdPopupProps['onClosed']>,
  /** 组件准备展示时触发 */
  onOpen: Function as PropType<TdPopupProps['onOpen']>,
  /** 组件展示且动画结束后执行 */
  onOpened: Function as PropType<TdPopupProps['onOpened']>,
  /** 当浮层隐藏或显示时触发 */
  onVisibleChange: Function as PropType<TdPopupProps['onVisibleChange']>,
};
