/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import type { PropType } from 'vue';
import type { TdSideBarProps } from './type';
export default {
  /** 选项值 */
  value: {
    type: [String, Number] as PropType<TdSideBarProps['value']>,
    default: undefined as TdSideBarProps['value'],
  },
  modelValue: {
    type: [String, Number] as PropType<TdSideBarProps['value']>,
    default: undefined as TdSideBarProps['value'],
  },
  /** 选项值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdSideBarProps['defaultValue']>,
  },
  /** 选项值发生变化时触发 */
  onChange: Function as PropType<TdSideBarProps['onChange']>,
  /** 点击选项时触发 */
  onClick: Function as PropType<TdSideBarProps['onClick']>,
};
