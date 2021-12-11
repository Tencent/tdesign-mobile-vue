/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 01:00:48
 * */

import { TdSwitchProps } from './type';
import { PropType } from 'vue';

export default {
  /** 自定义颜色，[打开时的颜色，关闭时的颜色]。组件默认颜色为 ['#0052d9', 'rgba(0, 0, 0, .26']。示例：[blue, gray] */
  colors: {
    type: Array as PropType<TdSwitchProps['colors']>,
  },
  /** 开关内容，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0] */
  customValue: {
    type: Array as PropType<TdSwitchProps['customValue']>,
  },
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 开关的标签 */
  label: {
    type: String,
    default: '',
  },
  /** 开关值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdSwitchProps['value']>,
    default: false,
  },
  /** 开关值，非受控属性 */
  defaultValue: {
    type: [String, Number, Boolean] as PropType<TdSwitchProps['defaultValue']>,
    default: false,
  },
  /** 数据发生变化时触发 */
  onChange: Function as PropType<TdSwitchProps['onChange']>,
};
