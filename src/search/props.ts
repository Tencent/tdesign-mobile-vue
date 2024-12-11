/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSearchProps } from './type';
import { PropType } from 'vue';

export default {
  /** 自定义右侧操作按钮文字，如：“取消” */
  action: {
    type: [String, Function] as PropType<TdSearchProps['action']>,
    default: '',
  },
  /** 【讨论中】联想词列表，如果不存在或长度为 0 则不显示联想框。可以使用函数 `label` 自定义联想词为任意内容；也可使用插槽 `option` 定义联想词内容，插槽参数为 `{ option: AutocompleteOption; index: number }`。如果 `group` 值为 `true` 则表示当前项为分组标题 */
  autocompleteOptions: {
    type: Array as PropType<TdSearchProps['autocompleteOptions']>,
  },
  /** 是否居中 */
  center: Boolean,
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: true,
  },
  /** 禁用状态 */
  disabled: Boolean,
  /** 是否聚焦 */
  focus: Boolean,
  /** 左侧图标 */
  leftIcon: {
    type: [String, Function] as PropType<TdSearchProps['leftIcon']>,
    default: 'search',
  },
  /** 用户最多可以输入的文本长度，一个中文等于一个计数长度。默认为 -1，不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用 */
  maxLength: {
    type: [String, Number] as PropType<TdSearchProps['maxLength']>,
  },
  /** 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用 */
  maxcharacter: {
    type: Number,
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 只读状态 */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /** 预览结果列表 */
  resultList: {
    type: Array as PropType<TdSearchProps['resultList']>,
    default: (): TdSearchProps['resultList'] => [],
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
  /** 值，搜索关键词 */
  value: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: String,
    default: undefined,
  },
  /** 值，搜索关键词，非受控属性 */
  defaultValue: {
    type: String,
    default: '',
  },
  /** 点击搜索框右侧操作内容时触发 */
  onActionClick: Function as PropType<TdSearchProps['onActionClick']>,
  /** 失去焦点时触发 */
  onBlur: Function as PropType<TdSearchProps['onBlur']>,
  /** 搜索关键词发生变化时触发，可能场景有：搜索框内容发生变化、点击联想词 */
  onChange: Function as PropType<TdSearchProps['onChange']>,
  /** 点击清除时触发 */
  onClear: Function as PropType<TdSearchProps['onClear']>,
  /** 获得焦点时触发 */
  onFocus: Function as PropType<TdSearchProps['onFocus']>,
  /** 【讨论中】搜索触发，包含：手机键盘提交健、联想关键词点击、清空按钮点击等 */
  onSearch: Function as PropType<TdSearchProps['onSearch']>,
  /** 提交时触发，如：手机键盘提交按钮点击 */
  onSubmit: Function as PropType<TdSearchProps['onSubmit']>,
};
