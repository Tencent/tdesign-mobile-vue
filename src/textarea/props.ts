/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTextareaProps } from './type';
import { PropType } from 'vue';

export default {
  /** 自动聚焦，拉起键盘 */
  autofocus: Boolean,
  /** 是否自动增高，值为 autosize 时，style.height 不生效 */
  autosize: Boolean,
  /** 是否禁用文本框 */
  disabled: Boolean,
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<TdTextareaProps['label']>,
  },
  /** 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度 */
  maxcharacter: {
    type: Number,
  },
  /** 用户最多可以输入的字符个数 */
  maxlength: {
    type: Number,
  },
  /** 名称，HTML 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 文本框值 */
  value: {
    type: [String, Number] as PropType<TdTextareaProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number] as PropType<TdTextareaProps['value']>,
    default: undefined,
  },
  /** 文本框值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdTextareaProps['defaultValue']>,
    default: undefined,
  },
  /** 失去焦点时触发 */
  onBlur: Function as PropType<TdTextareaProps['onBlur']>,
  /** 输入内容变化时触发 */
  onChange: Function as PropType<TdTextareaProps['onChange']>,
  /** 获得焦点时触发 */
  onFocus: Function as PropType<TdTextareaProps['onFocus']>,
};
