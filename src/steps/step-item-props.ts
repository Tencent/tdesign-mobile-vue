/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import type { PropType } from 'vue';
import type { TdStepItemProps } from './type';
export default {
  /** 步骤描述 */
  content: {
    type: [String, Function] as PropType<TdStepItemProps['content']>,
    default: '' as TdStepItemProps['content'],
  },
  /** 步骤条自定义内容 */
  extra: {
    type: [String, Function] as PropType<TdStepItemProps['extra']>,
  },
  /** 图标，默认显示内置图标，也可以自定义图标，值为 false 则不显示图标。优先级大于 `status` 定义的图标 */
  icon: {
    type: [Boolean, Function] as PropType<TdStepItemProps['icon']>,
    default: true as TdStepItemProps['icon'],
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
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdStepItemProps['title']>,
    default: '' as TdStepItemProps['title'],
  },
  /** 标题右侧数据 仅支持 layout = 'vertical' 时 */
  titleRight: {
    type: [String, Function] as PropType<TdStepItemProps['titleRight']>,
    default: '' as TdStepItemProps['titleRight'],
  },
};
