/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDropdownItemProps } from '../dropdown-menu/type';
import { PropType } from 'vue';

export default {
  /** 是否禁用操作项 */
  disabled: Boolean,
  /** 底部 */
  footer: {
    type: Function as PropType<TdDropdownItemProps['footer']>,
  },
  /** 自定义菜单子项图标，值为 `undefined` 表示使用默认图标。[面板打开时的图标，面板关闭时的图标] */
  icon: {
    type: [Array, Function] as PropType<TdDropdownItemProps['icon']>,
    default: undefined as TdDropdownItemProps['icon'],
  },
  /** 用来定义 value / label / disabled 在 `options` 中对应的字段别名 */
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
    default: 1 as TdDropdownItemProps['optionsColumns'],
  },
  /** 复选框和内容相对位置，仅单选菜单栏有效 */
  placement: {
    type: String as PropType<TdDropdownItemProps['placement']>,
    default: 'left' as TdDropdownItemProps['placement'],
    validator(val: TdDropdownItemProps['placement']): boolean {
      if (!val) return true;
      return ['left', 'right'].includes(val);
    },
  },
  /** 选中值 */
  value: {
    type: [String, Number, Array] as PropType<TdDropdownItemProps['value']>,
    default: undefined as TdDropdownItemProps['value'],
  },
  modelValue: {
    type: [String, Number, Array] as PropType<TdDropdownItemProps['value']>,
    default: undefined as TdDropdownItemProps['value'],
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Number, Array] as PropType<TdDropdownItemProps['defaultValue']>,
    default: undefined as TdDropdownItemProps['defaultValue'],
  },
  /** 值改变时触发 */
  onChange: Function as PropType<TdDropdownItemProps['onChange']>,
  /** 点击确认时触发 */
  onConfirm: Function as PropType<TdDropdownItemProps['onConfirm']>,
  /** 点击重置时触发 */
  onReset: Function as PropType<TdDropdownItemProps['onReset']>,
};
