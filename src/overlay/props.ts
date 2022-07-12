/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdOverlayProps } from './type';
import { PropType } from 'vue';

export default {
  /** 动画时长，单位毫秒 */
  duration: {
    type: Number,
    default: 300,
  },
  /** 防止滚动穿透 */
  preventScrollThrough: {
    type: Boolean,
    default: true,
  },
  /** 遮罩层是否透明 */
  transparent: Boolean,
  /** 是否展示 */
  visible: {
    type: Boolean,
    default: true,
    required: true,
  },
  /** 遮罩的层级 */
  zIndex: {
    type: Number,
    default: 1000,
  },
  /** 遮罩层的点击事件 */
  onClick: Function as PropType<TdOverlayProps['onClick']>,
};
