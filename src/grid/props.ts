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
  /** 边框，默认不显示。值为 true 则显示默认边框，值类型为 object 则表示自定义边框样式 */
  border: {
    type: [Boolean, Object] as PropType<TdGridProps['border']>,
    default: false,
  },
  /** 每一行的列数量 */
  column: {
    type: Number,
    default: 4,
  },
  /** 间隔大小 */
  gutter: {
    type: Number,
  },
};
