/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-11-27 00:06:44
 * */

import { TdDropdownItemProps } from '../dropdown-menu/type';
import { PropType } from 'vue';

export default {
  /** 是否禁用 */
  disabled: Boolean,
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
  /** 选取模式 */
  selectMode: {
    type: String as PropType<TdDropdownItemProps['selectMode']>,
    default: 'single' as TdDropdownItemProps['selectMode'],
    validator(val: TdDropdownItemProps['selectMode']): boolean {
      return ['single', 'multi'].includes(val);
    },
  },
  /** 标题 */
  title: {
    type: String,
    default: '',
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
