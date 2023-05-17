/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdPopupProps } from './type';
import { PropType } from 'vue';

export default {
  /** 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  attach: {
    type: [String, Function] as PropType<TdPopupProps['attach']>,
    default: 'body',
  },
  /** 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以自定义关闭按钮 */
  closeBtn: {
    type: [Boolean, Function] as PropType<TdPopupProps['closeBtn']>,
  },
  /** 点击遮罩层是否关闭 */
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },
  /** 是否在关闭浮层时销毁浮层 */
  destroyOnClose: Boolean,
  /** 遮罩层的属性，透传至 overlay */
  overlayProps: {
    type: Object as PropType<TdPopupProps['overlayProps']>,
    default: () => ({}),
  },
  /** 浮层出现位置 */
  placement: {
    type: String as PropType<TdPopupProps['placement']>,
    default: 'top' as TdPopupProps['placement'],
    validator(val: TdPopupProps['placement']): boolean {
      if (!val) return true;
      return ['top', 'left', 'right', 'bottom', 'center'].includes(val);
    },
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
  /** 弹出层内容区的动画名，等价于transition组件的name属性 */
  transitionName: {
    type: String,
    default: '',
  },
  /** 是否显示浮层 */
  visible: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 是否显示浮层，非受控属性 */
  defaultVisible: Boolean,
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
