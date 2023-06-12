/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSideBarProps } from './type';
import { PropType } from 'vue';

export default {
  /** 选项值 */
  value: {
    type: [String, Number] as PropType<TdSideBarProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number] as PropType<TdSideBarProps['value']>,
    default: undefined,
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
