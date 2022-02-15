/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-31 22:56:24
 * */

import { TdStepperProps } from './type';
import { PropType } from 'vue';

export default {
  /** 禁用 */
  disabled: Boolean,
  /** 禁用输入框 */
  disableInput: Boolean,
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
  /** 步进 */
  step: {
    type: Number,
    default: 1,
  },
  /** 组件风格 */
  theme: {
    type: String as PropType<TdStepperProps['theme']>,
    default: 'normal' as TdStepperProps['theme'],
    validator(val: TdStepperProps['theme']): boolean {
      return ['normal', 'mode'].includes(val);
    },
  },
  /** 值 */
  value: {
    type: [String, Number] as PropType<TdStepperProps['value']>,
    default: 0,
  },
  /** 值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdStepperProps['defaultValue']>,
    default: 0,
  },
};
