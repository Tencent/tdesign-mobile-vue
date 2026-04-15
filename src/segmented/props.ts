/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSegmentedProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否禁用 */
  disabled: Boolean,
  /** 数据化配置选项内容 */
  options: {
    type: Object as PropType<TdSegmentedProps['options']>,
    default: (): TdSegmentedProps['options'] => [],
  },
  /** 当前选中的值 */
  value: {
    type: [String, Number] as PropType<TdSegmentedProps['value']>,
    default: undefined as TdSegmentedProps['value'],
  },
  modelValue: {
    type: [String, Number] as PropType<TdSegmentedProps['value']>,
    default: undefined as TdSegmentedProps['value'],
  },
  /** 当前选中的值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdSegmentedProps['defaultValue']>,
  },
  /** 选项值发生变化时触发 */
  onChange: Function as PropType<TdSegmentedProps['onChange']>,
};
