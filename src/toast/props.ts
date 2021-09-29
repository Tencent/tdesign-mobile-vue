/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-30 21:24:46
 * */

import { TdToastProps } from './type';
import { PropType } from 'vue';

export default {
  /** 图标排列方式 */
  direction: {
    type: String as PropType<TdToastProps['direction']>,
    validator(val: TdToastProps['direction']): boolean {
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
    type: Function as PropType<TdToastProps['icon']>,
  },
  /** 弹窗显示文字 */
  message: {
    type: String,
    default: '',
  },
  /** 弹窗展示位置 */
  position: {
    type: String as PropType<TdToastProps['position']>,
    default: 'middle' as TdToastProps['position'],
    validator(val: TdToastProps['position']): boolean {
      return ['top', 'middle', 'bottom'].includes(val);
    },
  },
  /** 是否显示背景遮罩，禁止背景点击和滚动 */
  showOverlay: Boolean,
  /** 提示类型 */
  type: {
    type: String as PropType<TdToastProps['type']>,
    validator(val: TdToastProps['type']): boolean {
      return ['loading', 'success', 'fail'].includes(val);
    },
  },
};
