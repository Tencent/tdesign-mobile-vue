/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCascaderProps } from './type';
import { PropType } from 'vue';

export default {
  /** 选项值 */
  value: {
    type: [String, Number] as PropType<TdCascaderProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number] as PropType<TdCascaderProps['value']>,
    default: undefined,
  },
  /** 选项数据 */
  options: {
    type: Array as PropType<TdCascaderProps['options']>,
    default: () => [],
  },
  /** 关闭 icon 图标 */
  closeIcon: {
    type: [Boolean, Function] as PropType<TdCascaderProps['closeIcon']>,
    default: true,
  },
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdCascaderProps['title']>,
    default: '',
  },
};
