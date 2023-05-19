/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDropdownItemProps } from '../dropdown-menu/type';
import { PropType } from 'vue';

export default {
  /** 是否禁用 */
  disabled: Boolean,
  /** 用来定义 value / label 在 `options` 中对应的字段别名 */
  keys: {
    type: Object as PropType<TdDropdownItemProps['keys']>,
  },
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
    default: (): TdDropdownItemProps['options'] => [],
  },
  /** 选项分栏（1-3） */
  optionsColumns: {
    type: [String, Number] as PropType<TdDropdownItemProps['optionsColumns']>,
    default: 1,
  },
  /** 已废弃。选项排列；不再支持 tree 布局，可与 treeSelect 配合使用 */
  optionsLayout: {
    type: String,
    default: 'columns',
  },
  /** 选中值 */
  value: {
    type: [String, Number, Array] as PropType<TdDropdownItemProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number, Array] as PropType<TdDropdownItemProps['value']>,
    default: undefined,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Number, Array] as PropType<TdDropdownItemProps['defaultValue']>,
    default: undefined,
  },
  /** 值改变时触发 */
  onChange: Function as PropType<TdDropdownItemProps['onChange']>,
  /** 点击确认时触发 */
  onConfirm: Function as PropType<TdDropdownItemProps['onConfirm']>,
};
