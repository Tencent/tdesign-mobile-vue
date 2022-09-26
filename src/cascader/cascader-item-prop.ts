/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCascaderItem } from './type';
import { PropType } from 'vue';

export default {
  /** 选项值 */
  value: {
    type: [String, Number] as PropType<TdCascaderItem['value']>,
    default: undefined,
  },
  /** 标题 */
  label: {
    type: [String, Function] as PropType<TdCascaderItem['label']>,
    default: '',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否激活 */
  active: {
    type: Boolean,
    default: false,
  },
  /** 索引 */
  index: {
    type: String,
    default: '',
  },
  /** 孩子元素 */
  children: {
    type: [Array] as PropType<TdCascaderItem['children']>,
    default: [],
  },
  /** 是否选择 */
  selected: {
    type: Boolean,
    default: false,
  },
};
