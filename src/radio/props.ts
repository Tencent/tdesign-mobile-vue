/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdRadioProps } from './type';
import { PropType } from 'vue';

export default {
  /** 复选框和内容相对位置 */
  align: {
    type: String as PropType<TdRadioProps['align']>,
    default: 'left' as TdRadioProps['align'],
    validator(val: TdRadioProps['align']): boolean {
      return ['left', 'right'].includes(val!);
    },
  },
  /** 是否选中 */
  checked: {
   type: Boolean,
   default: undefined 
  },
  modelValue: {
   type: Boolean,
   default: undefined 
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
  /** 是否为禁用态 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 自定义选中图标和非选中图标。示例：[选中态图标地址，非选中态图标地址]。值为 fill-circle 表示图标为填充型图标，值为 stroke-line 表示图标为描边型图标 */
  icon: {
    type: [String, Array] as PropType<TdRadioProps['icon']>,
    default: 'fill-circle',
  },
  /** 主文案 */
  label: {
    type: [String, Function] as PropType<TdRadioProps['label']>,
  },
  /** HTML 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 单选按钮的值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdRadioProps['value']>,
    default: false,
  },
  /** 选中状态变化时触发 */
  onChange: Function as PropType<TdRadioProps['onChange']>,
};
