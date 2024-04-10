/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTreeSelectProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许清空 */
  clearable: Boolean,
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
  /** 是否多选 */
  multiple: Boolean,
  /** 选项 */
  options: {
    type: Array as PropType<TdTreeSelectProps['options']>,
    default: (): TdTreeSelectProps['options'] => [],
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 【开发中】透传 SelectInput 筛选器输入框组件的全部属性 */
  selectInputProps: {
    type: Object as PropType<TdTreeSelectProps['selectInputProps']>,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TdTreeSelectProps['size']>,
    default: 'medium' as TdTreeSelectProps['size'],
    validator(val: TdTreeSelectProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 透传 Tag 标签组件全部属性 */
  tagProps: {
    type: Object as PropType<TdTreeSelectProps['tagProps']>,
  },
  /** 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue` */
  value: {
    type: [String, Number, Object, Array] as PropType<TdTreeSelectProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number, Object, Array] as PropType<TdTreeSelectProps['value']>,
    default: undefined,
  },
  /** 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue`，非受控属性 */
  defaultValue: {
    type: [String, Number, Object, Array] as PropType<TdTreeSelectProps['defaultValue']>,
  },
  /** 节点选中状态变化时触发，`context.node` 表示当前变化的选项，`context. trigger` 表示触发变化的来源。泛型 `TreeValueType` 继承自 `TreeSelectValue`  */
  onChange: Function as PropType<TdTreeSelectProps['onChange']>,
};
