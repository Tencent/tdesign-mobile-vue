/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTreeSelectProps } from './type';
import { PropType } from 'vue';

export default {
  /** 自定义组件样式 */
  customStyle: {
    type: String,
    default: '',
  },
  /** 是否可搜索 */
  filterable: Boolean,
  /** 高度，默认单位为 px */
  height: {
    type: [String, Number] as PropType<TdTreeSelectProps['height']>,
    default: 336,
  },
  /** 用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label: 'name', children: 'list' }` */
  keys: {
    type: Object as PropType<TdTreeSelectProps['keys']>,
  },
  /** 是否允许多选 */
  multiple: Boolean,
  /** 选项 */
  options: {
    type: Array as PropType<TdTreeSelectProps['options']>,
    default: (): TdTreeSelectProps['options'] => [],
  },
  /** 选中值 */
  value: {
    type: [String, Number, Array] as PropType<TdTreeSelectProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number, Array] as PropType<TdTreeSelectProps['value']>,
    default: undefined,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Number, Array] as PropType<TdTreeSelectProps['defaultValue']>,
  },
  /** 点击任何节点均会触发；level 代表当前点击的层级，0 代表最左侧，依次递进 */
  onChange: Function as PropType<TdTreeSelectProps['onChange']>,
};
