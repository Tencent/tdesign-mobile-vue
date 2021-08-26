/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-26 17:33:46
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
  /** 标签 */
  label: {
    type: String,
    default: '',
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
  /** 简洁模式 */
  pureMode: Boolean,
  /** 步进 */
  step: {
    type: Number,
    default: 1,
  },
  /** 值 */
  value: {
    type: [String, Number] as PropType<TdStepperProps['value']>,
    default: 0,
  },
};
