/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdFormItemProps } from '../form/type';
import { PropType } from 'vue';

export default {
  /** 是否显示右侧箭头 */
  arrow: Boolean,
  /** 表单内容对齐方式：左对齐、右对齐 */
  contentAlign: {
    type: String as PropType<TdFormItemProps['contentAlign']>,
    default: 'left' as TdFormItemProps['contentAlign'],
    validator(val: TdFormItemProps['contentAlign']): boolean {
      if (!val) return true;
      return ['left', 'right'].includes(val);
    },
  },
  /** label 原生属性 */
  for: {
    type: String,
    default: '',
  },
  /** 表单项说明内容 */
  help: {
    type: [String, Function] as PropType<TdFormItemProps['help']>,
  },
  /** 字段标签名称 */
  label: {
    type: [String, Function] as PropType<TdFormItemProps['label']>,
    default: '',
  },
  /** 表单字段标签对齐方式：左对齐、右对齐、顶部对齐。默认使用 Form 的对齐方式，优先级高于 Form.labelAlign */
  labelAlign: {
    type: String as PropType<TdFormItemProps['labelAlign']>,
    validator(val: TdFormItemProps['labelAlign']): boolean {
      if (!val) return true;
      return ['left', 'right', 'top'].includes(val);
    },
  },
  /** 可以整体设置标签宽度，优先级高于 Form.labelWidth */
  labelWidth: {
    type: [String, Number] as PropType<TdFormItemProps['labelWidth']>,
  },
  /** 表单字段名称 */
  name: {
    type: [String, Number] as PropType<TdFormItemProps['name']>,
  },
  /** 是否显示必填符号（*），优先级高于 Form.requiredMark */
  requiredMark: {
    type: Boolean,
    default: undefined,
  },
  /** 表单字段校验规则 */
  rules: {
    type: Array as PropType<TdFormItemProps['rules']>,
  },
  /** 校验不通过时，是否显示错误提示信息，优先级高于 `Form.showErrorMessage` */
  showErrorMessage: {
    type: Boolean,
    default: undefined,
  },
};
