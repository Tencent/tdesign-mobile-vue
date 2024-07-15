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
  /** 禁用状态。优先级：Button.disabled > Form.disabled */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 是否为幽灵按钮（镂空按钮） */
  ghost: Boolean,
  /** 按钮内部图标，可完全自定义 */
  icon: {
    type: Function as PropType<TdButtonProps['icon']>,
  },
  /** 是否显示为加载状态 */
  loading: Boolean,
  /** 透传 Loading 组件全部属性 */
  loadingProps: {
    type: Object as PropType<TdButtonProps['loadingProps']>,
  },
  /** 按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形 */
  shape: {
    type: String as PropType<TdButtonProps['shape']>,
    default: 'rectangle' as TdButtonProps['shape'],
    validator(val: TdButtonProps['shape']): boolean {
      if (!val) return true;
      return ['rectangle', 'square', 'round', 'circle'].includes(val);
    },
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdButtonProps['size']>,
    default: 'medium' as TdButtonProps['size'],
    validator(val: TdButtonProps['size']): boolean {
      if (!val) return true;
      return ['extra-small', 'small', 'medium', 'large'].includes(val);
    },
  },
  /** 右侧内容，可用于定义右侧图标 */
  suffix: {
    type: Function as PropType<TdButtonProps['suffix']>,
  },
  /** 组件风格，依次为品牌色、危险色 */
  theme: {
    type: String as PropType<TdButtonProps['theme']>,
    default: 'default' as TdButtonProps['theme'],
    validator(val: TdButtonProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'primary', 'danger', 'light'].includes(val);
    },
  },
  /** 按钮类型 */
  type: {
    type: String as PropType<TdButtonProps['type']>,
    default: 'button' as TdButtonProps['type'],
    validator(val: TdButtonProps['type']): boolean {
      if (!val) return true;
      return ['submit', 'reset', 'button'].includes(val);
    },
  },
  /** 按钮形式，基础、线框、文字 */
  variant: {
    type: String as PropType<TdButtonProps['variant']>,
    default: 'base' as TdButtonProps['variant'],
    validator(val: TdButtonProps['variant']): boolean {
      if (!val) return true;
      return ['base', 'outline', 'dashed', 'text'].includes(val);
    },
  },
  /** 点击时触发 */
  onClick: Function as PropType<TdButtonProps['onClick']>,
};
