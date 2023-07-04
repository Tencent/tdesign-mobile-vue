/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdRadioGroupProps } from '../radio/type';
import { PropType } from 'vue';

export default {
  /** 是否允许取消选中 */
  allowUncheck: Boolean,
  /** 是否开启无边框模式；优先级低于 Radio */
  borderless: Boolean,
  /** 是否禁用全部子单选框。默认为 false。RadioGroup.disabled 优先级低于 Radio.disabled */
  disabled: Boolean,
  /** 自定义选中图标和非选中图标。示例：[选中态图标地址，非选中态图标地址]。使用 String 时，值为 circle 表示填充型图标、值为 line 表示描边型图标、值为 dot 表示圆点图标 */
  icon: {
    type: [String, Array] as PropType<TdRadioGroupProps['icon']>,
    default: 'circle',
  },
  /** 用来定义 value / label 在 `options` 中对应的字段别名 */
  keys: {
    type: Object as PropType<TdRadioGroupProps['keys']>,
  },
  /** HTML 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同 */
  options: {
    type: Array as PropType<TdRadioGroupProps['options']>,
  },
  /** 复选框和内容相对位置 */
  placement: {
    type: String as PropType<TdRadioGroupProps['placement']>,
    default: 'left' as TdRadioGroupProps['placement'],
    validator(val: TdRadioGroupProps['placement']): boolean {
      if (!val) return true;
      return ['left', 'right'].includes(val);
    },
  },
  /** 选中的值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdRadioGroupProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number, Boolean] as PropType<TdRadioGroupProps['value']>,
    default: undefined,
  },
  /** 选中的值，非受控属性 */
  defaultValue: {
    type: [String, Number, Boolean] as PropType<TdRadioGroupProps['defaultValue']>,
  },
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdRadioGroupProps['onChange']>,
};
