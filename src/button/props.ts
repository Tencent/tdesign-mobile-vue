/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-04-06 09:11:08
 * */

import { TdButtonProps } from '@TdTypes/button/TdButtonProps';
import { PropType } from 'vue';

export default {
  /** 是否为块级元素 */
  block: Boolean,
  /** 是否禁用按钮 */
  disabled: Boolean,
  /** 是否为幽灵按钮 */
  ghost: Boolean,
  /** 按钮内部图标，可完全自定义 */
  icon: {
    type: Function as PropType<TdButtonProps['icon']>,
    default: undefined,
  },
  /** 是否显示为加载状态 */
  loading: Boolean,
  /** 按钮形状，有二种：方形、圆角方形 */
  shape: {
    type: String as PropType<TdButtonProps['shape']>,
    default: 'square',
    validator(val: string): boolean {
      return ['square', 'round'].includes(val);
    },
  },
  /** 组件子元素（默认插槽） */
  size: {
    type: String as PropType<TdButtonProps['size']>,
    default: 'medium',
    validator(val: string): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 组件主题风格，默认、主色、危险 */
  theme: {
    type: String as PropType<TdButtonProps['theme']>,
    default: 'default',
    validator(val: string): boolean {
      return ['default', 'primary', 'danger'].includes(val);
    },
  },
  /** 按钮形式，基础、线框、虚线、文字 */
  variant: {
    type: String as PropType<TdButtonProps['variant']>,
    default: 'base',
    validator(val: string): boolean {
      return ['base', 'outline', 'dashed', 'text'].includes(val);
    },
  },
};
