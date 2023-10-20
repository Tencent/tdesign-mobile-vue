/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdStepperProps } from './type';
import { PropType } from 'vue';

export default {
  /** 禁用输入框 */
  disableInput: Boolean,
  /** 禁用全部操作 */
  disabled: Boolean,
  /** 输入框宽度 */
  inputWidth: {
    type: Number,
  },
  /** 最大值 */
  max: {
    type: Number,
    default: 100,
  },
  /** 最小值 */
  min: {
    type: Number,
    default: 0,
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdStepperProps['size']>,
    default: 'medium' as TdStepperProps['size'],
    validator(val: TdStepperProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 步长 */
  step: {
    type: Number,
    default: 1,
  },
  /** 组件风格 */
  theme: {
    type: String as PropType<TdStepperProps['theme']>,
    default: 'normal' as TdStepperProps['theme'],
    validator(val: TdStepperProps['theme']): boolean {
      if (!val) return true;
      return ['normal', 'filled', 'outline'].includes(val);
    },
  },
  /** 值 */
  value: {
    type: [String, Number] as PropType<TdStepperProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number] as PropType<TdStepperProps['value']>,
    default: undefined,
  },
  /** 值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdStepperProps['defaultValue']>,
    default: 0,
  },
  /** 是否整数，为 true 仅允许输入不带小数点的数，为 false 允许输入带小数点的数 */
  integer: {
    type: Boolean,
    default: true,
  },
  /** 输入框失去焦点时触发 */
  onBlur: Function as PropType<TdStepperProps['onBlur']>,
  /** 数值发生变更时触发 */
  onChange: Function as PropType<TdStepperProps['onChange']>,
  /** 输入框聚焦时触发 */
  onFocus: Function as PropType<TdStepperProps['onFocus']>,
  /** 数值超出限制时触发 */
  onOverlimit: Function as PropType<TdStepperProps['onOverlimit']>,
};
