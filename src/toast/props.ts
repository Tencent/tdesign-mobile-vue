/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdToastProps } from './type';
import { PropType } from 'vue';

export default {
  /** 图标排列方式 */
  direction: {
    type: String as PropType<TdToastProps['direction']>,
    default: 'row' as TdToastProps['direction'],
    validator(val: TdToastProps['direction']): boolean {
      if (!val) return true;
      return ['row', 'column'].includes(val);
    },
  },
  /** 弹窗显示毫秒数 */
  duration: {
    type: Number,
    default: 2000,
  },
  /** 自定义图标 */
  icon: {
    type: [String, Function] as PropType<TdToastProps['icon']>,
  },
  /** 弹窗显示文字 */
  message: {
    type: [String, Function] as PropType<TdToastProps['message']>,
  },
  /** 遮罩层属性，透传至 Overlay */
  overlayProps: {
    type: Object as PropType<TdToastProps['overlayProps']>,
    default: () => ({}),
  },
  /** 弹窗展示位置 */
  placement: {
    type: String as PropType<TdToastProps['placement']>,
    default: 'middle' as TdToastProps['placement'],
    validator(val: TdToastProps['placement']): boolean {
      if (!val) return true;
      return ['top', 'middle', 'bottom'].includes(val);
    },
  },
  /** 防止滚动穿透，即不允许点击和滚动 */
  preventScrollThrough: Boolean,
  /** 是否显示遮罩层 */
  showOverlay: Boolean,
  /** 提示类型 */
  theme: {
    type: String as PropType<TdToastProps['theme']>,
    validator(val: TdToastProps['theme']): boolean {
      if (!val) return true;
      return ['loading', 'success', 'fail'].includes(val);
    },
  },
};
