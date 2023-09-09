/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTextareaProps } from './type';
import { PropType } from 'vue';

export default {
  /** 超出 `maxlength` 或 `maxcharacter` 之后是否允许继续输入 */
  allowInputOverMax: Boolean,
  /** 自动聚焦，拉起键盘 */
  autofocus: Boolean,
  /** 是否自动增高，值为 autosize 时，style.height 不生效 */
  autosize: Boolean,
  /** 是否禁用文本框 */
  disabled: Boolean,
  /** 是否显示外边框 */
  bordered: {
    type: Boolean,
    default: false,
  },
  /** 显示文本计数器，如 0/140。当 `maxlength < 0 && maxcharacter < 0` 成立时， indicator无效 */
  indicator: {
    type: Boolean,
  },
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<TdTextareaProps['label']>,
  },
  /** 标题输入框布局方式 */
  layout: {
    type: String as PropType<TdTextareaProps['layout']>,
    default: 'horizontal' as TdTextareaProps['layout'],
    validator(val: TdTextareaProps['layout']): boolean {
      if (!val) return true;
      return ['vertical', 'horizontal'].includes(val);
    },
  },
  /** 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度 */
  maxcharacter: {
    type: Number,
  },
  /** 用户最多可以输入的字符个数。默认为 -1，不限制输入长度 */
  maxlength: {
    type: Number,
    default: -1,
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
