/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCheckboxProps } from './type';
import { PropType } from 'vue';

export default {
  /** 复选框和内容相对位置 */
  align: {
    type: String as PropType<TdCheckboxProps['align']>,
    default: 'left' as TdCheckboxProps['align'],
    validator(val: TdCheckboxProps['align']): boolean {
      if (!val) return true;
      return ['left', 'right'].includes(val);
    },
  },
  /** 用于标识是否为「全选选项」。单独使用无效，需在 CheckboxGroup 中使用 */
  checkAll: Boolean,
  /** 是否选中 */
  checked: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 是否选中，非受控属性 */
  defaultChecked: Boolean,
  /** 复选框内容 */
  content: {
    type: [String, Function] as PropType<TdCheckboxProps['content']>,
  },
  /** 是否禁用组件内容（content）触发选中 */
  contentDisabled: Boolean,
  /** 复选框内容，同 label */
  default: {
    type: [String, Function] as PropType<TdCheckboxProps['default']>,
  },
  /** 是否禁用组件 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 自定义选中图标和非选中图标。示例：[选中态图标，非选中态图标] */
  icon: {
    type: Array as PropType<TdCheckboxProps['icon']>,
  },
  /** 是否为半选 */
  indeterminate: Boolean,
  /** 主文案 */
  label: {
    type: [String, Function] as PropType<TdCheckboxProps['label']>,
  },
  /** 内容最大行数限制 */
  maxContentRow: {
    type: Number,
    default: 5,
  },
  /** 主文案最大行数限制 */
  maxLabelRow: {
    type: Number,
    default: 3,
  },
  /** HTML 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 组件是否只读 */
  readonly: Boolean,
  /** 复选框的值 */
  value: {
    type: [String, Number] as PropType<TdCheckboxProps['value']>,
  },
  /** 值变化时触发 */
  onChange: Function as PropType<TdCheckboxProps['onChange']>,
};
