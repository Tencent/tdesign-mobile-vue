/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdOverlayProps } from './type';
import { PropType } from 'vue';

export default {
  /** 遮罩层的背景色 */
  backgroundColor: {
    type: String,
    default: '',
  },
  /** 遮罩层自定义样式。优先级低于其他属性 */
  customStyle: {
    type: String,
    default: '',
  },
  /** 背景色过渡时间，单位毫秒 */
  duration: {
    type: Number,
    default: 300,
  },
  /** 是否阻止背景滚动，阻止时蒙层里的内容也将无法滚动 */
  preventScrollThrough: {
    type: Boolean,
    default: true,
  },
  /** 是否展示 */
  visible: Boolean,
  /** 遮罩的层级，默认为 1000 */
  zIndex: {
    type: Number,
  },
  /** 遮罩层的点击事件 */
  onClick: Function as PropType<TdOverlayProps['onClick']>,
  /** 遮罩执行消失动画效果前触发 */
  onClose: Function as PropType<TdOverlayProps['onClose']>,
  /** 遮罩消失动画效果结束后触发 */
  onClosed: Function as PropType<TdOverlayProps['onClosed']>,
  /** 遮罩执行弹出动画效果前触发 */
  onOpen: Function as PropType<TdOverlayProps['onOpen']>,
  /** 遮罩弹出动画效果结束后触发 */
  onOpened: Function as PropType<TdOverlayProps['onOpened']>,
};
