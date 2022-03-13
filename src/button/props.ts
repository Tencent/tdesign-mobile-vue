/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdButtonProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否为块级元素 */
  block: Boolean,
  /** 按钮内容 */
  content: {
    type: [String, Function] as PropType<TdButtonProps['content']>,
  },
  /** 是否禁用按钮 */
  disabled: Boolean,
  /** 是否为幽灵按钮（镂空按钮） */
  ghost: Boolean,
  /** 按钮内部图标，可完全自定义 */
  icon: {
    type: Function as PropType<TdButtonProps['icon']>,
  },
  /** 是否显示为加载状态 */
  loading: Boolean,
  /** 按钮形状，有二种：方形、圆角方形  */
  shape: {
    type: String as PropType<TdButtonProps['shape']>,
    default: 'square' as TdButtonProps['shape'],
    validator(val: TdButtonProps['shape']): boolean {
      if (!val) return true;
      return ['square', 'round'].includes(val);
    },
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdButtonProps['size']>,
    default: 'medium' as TdButtonProps['size'],
    validator(val: TdButtonProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 组件风格，依次为品牌色、危险色 */
  theme: {
    type: String as PropType<TdButtonProps['theme']>,
    default: 'default' as TdButtonProps['theme'],
    validator(val: TdButtonProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'primary', 'danger'].includes(val);
    },
  },
  /** 按钮形式，基础、线框、文字 */
  variant: {
    type: String as PropType<TdButtonProps['variant']>,
    default: 'base' as TdButtonProps['variant'],
    validator(val: TdButtonProps['variant']): boolean {
      if (!val) return true;
      return ['base', 'outline', 'text'].includes(val);
    },
  },
  /** 点击时触发 */
  onClick: Function as PropType<TdButtonProps['onClick']>,
};
