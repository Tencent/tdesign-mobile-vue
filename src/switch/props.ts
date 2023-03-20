/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSwitchProps } from './type';
import { PropType } from 'vue';

export default {
  /** 已废弃。已废弃。自定义颜色，[打开时的颜色，关闭时的颜色]。组件默认颜色为 ['#0052d9', 'rgba(0, 0, 0, .26']。示例：[blue, gray] */
  colors: {
    type: Array as PropType<TdSwitchProps['colors']>,
  },
  /** 用于自定义开关的值，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]、['open', 'close'] */
  customValue: {
    type: Array as PropType<TdSwitchProps['customValue']>,
  },
  /** 是否禁用组件，默认为 false */
  disabled: Boolean,
  /** 开关的图标；[打开时的图标，关闭时的图标] */
  icon: {
    type: Array as PropType<TdSwitchProps['icon']>,
    default: (): TdSwitchProps['icon'] => [],
  },
  /** 开关的标签；[打开时的标签，关闭时的标签] */
  label: {
    type: Array as PropType<TdSwitchProps['label']>,
    default: (): TdSwitchProps['label'] => [],
  },
  /** 是否处于加载中状态 */
  loading: Boolean,
  /** 开关尺寸 */
  size: {
    type: String as PropType<TdSwitchProps['size']>,
    default: 'medium' as TdSwitchProps['size'],
    validator(val: TdSwitchProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 开关值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdSwitchProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number, Boolean] as PropType<TdSwitchProps['value']>,
    default: undefined,
  },
  /** 开关值，非受控属性 */
  defaultValue: {
    type: [String, Number, Boolean] as PropType<TdSwitchProps['defaultValue']>,
  },
  /** 数据发生变化时触发 */
  onChange: Function as PropType<TdSwitchProps['onChange']>,
};
