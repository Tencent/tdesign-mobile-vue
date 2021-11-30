/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-11-30 10:39:32
 * */

import { TdStepItemProps } from '../steps/type';
import { PropType } from 'vue';

export default {
  /** 步骤描述 */
  content: {
    type: [String, Function] as PropType<TdStepItemProps['content']>,
    default: '',
  },
  /** 图标，默认显示内置图标，也可以自定义图标 */
  icon: {
    type: [Boolean, Function] as PropType<TdStepItemProps['icon']>,
    default: true,
  },
  /** 当前步骤的状态 */
  status: {
    type: String as PropType<TdStepItemProps['status']>,
    default: 'default' as TdStepItemProps['status'],
    validator(val: TdStepItemProps['status']): boolean {
      return ['default', 'process', 'finish', 'error'].includes(val);
    },
  },
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdStepItemProps['title']>,
    default: '',
  },
};
