/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCascaderProps } from './type';
import { PropType } from 'vue';

export default {
  /** 父子节点选中状态不再关联，可各自选中或取消 */
  checkStrictly: Boolean,
  /** 关闭按钮 */
  closeBtn: {
    type: [Boolean, Function] as PropType<TdCascaderProps['closeBtn']>,
    default: true as TdCascaderProps['closeBtn'],
  },
  /** 头部 */
  header: {
    type: Function as PropType<TdCascaderProps['header']>,
  },
  /** 用来定义 value / label / children / disabled 在 `options` 中对应的字段别名 */
  keys: {
    type: Object as PropType<TdCascaderProps['keys']>,
  },
  /** 加载子树数据的方法（仅当节点 children 为 true 时生效） */
  load: {
    type: Function as PropType<TdCascaderProps['load']>,
  },
  /** 中间内容 */
  middleContent: {
    type: Function as PropType<TdCascaderProps['middleContent']>,
  },
  /** 可选项数据源 */
  options: {
    type: Array as PropType<TdCascaderProps['options']>,
    default: (): TdCascaderProps['options'] => [],
  },
  /** 遮罩层的属性，透传至 overlay */
  overlayProps: {
    type: Object as PropType<TdCascaderProps['overlayProps']>,
    default: () => ({}),
  },
  /** 未选中时的提示文案 */
  placeholder: {
    type: [String, Function] as PropType<TdCascaderProps['placeholder']>,
    default: '选择选项' as TdCascaderProps['placeholder'],
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
    default: undefined as TdCascaderProps['value'],
  },
  modelValue: {
    type: [String, Number] as PropType<TdCascaderProps['value']>,
    default: undefined as TdCascaderProps['value'],
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
