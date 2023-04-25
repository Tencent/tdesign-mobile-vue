/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdStepItemProps } from '../steps/type';
import { PropType } from 'vue';

export default {
  /** 步骤描述 */
  content: {
    type: [String, Function] as PropType<TdStepItemProps['content']>,
    default: '',
  },
  /** 图标，默认显示内置图标，也可以自定义图标，值为 false 则不显示图标。优先级大于 `status` 定义的图标 */
  icon: {
    type: [Boolean, Function] as PropType<TdStepItemProps['icon']>,
    default: true,
  },
  /** 当前步骤的状态：默认状态（未开始）、进行中状态、完成状态、错误状态 */
  status: {
    type: String as PropType<TdStepItemProps['status']>,
    default: 'default' as TdStepItemProps['status'],
    validator(val: TdStepItemProps['status']): boolean {
      if (!val) return true;
      return ['default', 'process', 'finish', 'error'].includes(val);
    },
  },
  /** 子步骤条，仅支持 layout  = 'vertical' 时 */
  subStepItems: {
    type: Array as PropType<TdStepItemProps['subStepItems']>,
    default: (): TdStepItemProps['subStepItems'] => [],
  },
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdStepItemProps['title']>,
    default: '',
  },
};
