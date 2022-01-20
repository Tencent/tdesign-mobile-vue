/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-24 15:44:37
 * */

import { TdDropdownItemProps } from '../dropdown-menu/type';
import { PropType } from 'vue';

export default {
  /** 是否禁用 */
  disabled: Boolean,
  /** 标题 */
  label: {
    type: String,
    default: '',
  },
  /** 是否多选 */
  multiple: Boolean,
  /** 选项数据 */
  options: {
    type: Array as PropType<TdDropdownItemProps['options']>,
  },
  /** 选项分栏（1-3） */
  optionsColumns: {
    type: [String, Number] as PropType<TdDropdownItemProps['optionsColumns']>,
  },
  /** 选项排列 */
  optionsLayout: {
    type: String as PropType<TdDropdownItemProps['optionsLayout']>,
    default: 'columns' as TdDropdownItemProps['optionsLayout'],
    validator(val: TdDropdownItemProps['optionsLayout']): boolean {
      return ['columns', 'tree'].includes(val);
    },
  },
  /** 选中值 */
  value: {
    type: [String, Number, Array] as PropType<TdDropdownItemProps['value']>,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Number, Array] as PropType<TdDropdownItemProps['defaultValue']>,
  },
};
