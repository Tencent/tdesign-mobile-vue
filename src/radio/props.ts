/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdRadioProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许取消选中 */
  allowUncheck: Boolean,
  /** 是否为块级元素 */
  block: {
    type: Boolean,
    default: true,
  },
  /** 是否开启无边框模式 */
  borderless: {
    type: Boolean,
    default: undefined,
  },
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
  /** 单选内容 */
  content: {
    type: [String, Function] as PropType<TdRadioProps['content']>,
  },
  /** 是否禁用组件内容（content）触发选中 */
  contentDisabled: Boolean,
  /** 单选按钮内容，同 label */
  default: {
    type: [String, Function] as PropType<TdRadioProps['default']>,
  },
  /** 是否为禁用态。如果存在父组件 RadioGroup，默认值由 RadioGroup.disabled 控制。优先级：Radio.disabled > RadioGroup.disabled > Form.disabled */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 自定义选中图标和非选中图标。示例：[选中态图标地址，非选中态图标地址]。使用 String 时，值为 circle 表示填充型图标、值为 line 表示描边型图标、值为 dot 表示圆点图标、值为 'none' 则表示没有图标 */
  icon: {
    type: [String, Array] as PropType<TdRadioProps['icon']>,
    default: 'circle',
  },
  /** 主文案 */
  label: {
    type: [String, Function] as PropType<TdRadioProps['label']>,
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
  /** 复选框和内容相对位置 */
  placement: {
    type: String as PropType<TdRadioProps['placement']>,
    default: 'left' as TdRadioProps['placement'],
    validator(val: TdRadioProps['placement']): boolean {
      if (!val) return true;
      return ['left', 'right'].includes(val);
    },
  },
  /** 只读状态 */
  readonly: Boolean,
  /** 单选按钮的值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdRadioProps['value']>,
    default: undefined,
  },
  /** 选中状态变化时触发 */
  onChange: Function as PropType<TdRadioProps['onChange']>,
};
