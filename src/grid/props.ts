/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdGridProps } from './type';
import { PropType } from 'vue';

export default {
  /** 内容对齐方式 */
  align: {
    type: String as PropType<TdGridProps['align']>,
    default: 'center' as TdGridProps['align'],
    validator(val: TdGridProps['align']): boolean {
      if (!val) return true;
      return ['left', 'center'].includes(val);
    },
  },
  /** 是否显示边框 */
  border: Boolean,
  /** 每一行的列数量；为 0 时等于固定大小 */
  column: {
    type: Number,
    default: 4,
  },
  /** 间隔大小 */
  gutter: {
    type: Number,
  },
  /** 宫格的风格 */
  theme: {
    type: String as PropType<TdGridProps['theme']>,
    default: 'default' as TdGridProps['theme'],
    validator(val: TdGridProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'card'].includes(val);
    },
  },
};
