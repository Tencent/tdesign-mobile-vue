/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCascaderProps } from './type';
import { PropType } from 'vue';

export default {
  /** 关闭按钮 */
  closeBtn: {
    type: [Boolean, Function] as PropType<TdCascaderProps['closeBtn']>,
    default: true,
  },
  /** 用来定义 value / label 在 `options` 中对应的字段别名 */
  keys: {
    type: Object as PropType<TdCascaderProps['keys']>,
  },
  /** 可选项数据源 */
  options: {
    type: Array as PropType<TdCascaderProps['options']>,
    default: (): TdCascaderProps['options'] => [],
  },
  /** 每级展示的次标题 */
  subTitles: {
    type: Array as PropType<TdCascaderProps['subTitles']>,
    default: (): TdCascaderProps['subTitles'] => [],
  },
  /** 展示风格 */
  theme: {
    type: String as PropType<TdCascaderProps['theme']>,
    default: 'step' as TdCascaderProps['theme'],
    validator(val: TdCascaderProps['theme']): boolean {
      if (!val) return true;
      return ['step', 'tab'].includes(val);
    },
  },
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdCascaderProps['title']>,
  },
  /** 选项值 */
  value: {
    type: [String, Number] as PropType<TdCascaderProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number] as PropType<TdCascaderProps['value']>,
    default: undefined,
  },
  /** 选项值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdCascaderProps['defaultValue']>,
  },
  /** 是否展示 */
  visible: Boolean,
  /** 值发生变更时触发 */
  onChange: Function as PropType<TdCascaderProps['onChange']>,
  /** 关闭时触发 */
  onClose: Function as PropType<TdCascaderProps['onClose']>,
  /** 选择后触发 */
  onPick: Function as PropType<TdCascaderProps['onPick']>,
};
