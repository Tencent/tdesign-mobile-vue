/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdPickerItemProps } from '../picker/type';
import { PropType } from 'vue';

export default {
  /** 数据源 */
  options: {
    type: Array as PropType<TdPickerItemProps['options']>,
    default: (): TdPickerItemProps['options'] => [],
  },
  /** 默认选中的选项 */
  value: {
    type: [String, Number] as PropType<TdPickerItemProps['value']>,
  },
};
