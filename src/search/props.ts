/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSearchProps } from './type';
import { PropType } from 'vue';

export default {
  /** 自定义右侧操作按钮文字 */
  action: {
    type: [String, Function] as PropType<TdSearchProps['action']>,
    default: '',
  },
  /** 是否居中 */
  center: Boolean,
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: true,
  },
  /** 是否禁用 */
  disabled: Boolean,
  /** 是否聚焦 */
  focus: Boolean,
  /** 左侧文本 */
  label: {
    type: String,
    default: '',
  },
  /** 左侧图标 */
  leftIcon: {
    type: Function as PropType<TdSearchProps['leftIcon']>,
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 搜索框形状 */
  shape: {
    type: String as PropType<TdSearchProps['shape']>,
    default: 'square' as TdSearchProps['shape'],
    validator(val: TdSearchProps['shape']): boolean {
      if (!val) return true;
      return ['square', 'round'].includes(val);
    },
  },
  /** 值 */
  value: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  /** 值，非受控属性 */
  defaultValue: {
    type: String,
  },
  /** 点击右侧操作按钮文字时触发时触发 */
  onActionClick: Function as PropType<TdSearchProps['onActionClick']>,
  /** 失去焦点时触发 */
  onBlur: Function as PropType<TdSearchProps['onBlur']>,
  /** 值发生变化时触发 */
  onChange: Function as PropType<TdSearchProps['onChange']>,
  /** 点击清除时触发 */
  onClear: Function as PropType<TdSearchProps['onClear']>,
  /** 获得焦点时触发 */
  onFocus: Function as PropType<TdSearchProps['onFocus']>,
  /** 提交时触发 */
  onSubmit: Function as PropType<TdSearchProps['onSubmit']>,
};
