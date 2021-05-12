/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-04-08 14:17:40
 * */

import { TdCellProps } from '@TdTypes/cell/TdCellProps';
import { PropType } from 'vue';

export default {
  /** 最右侧图标，出现在单元格值的右侧 */
  icon: {
    type: Function as PropType<TdCellProps['icon']>,
  },
  /** 左侧标题 */
  label: {
    type: [String, Function] as PropType<TdCellProps['label']>,
  },
  /** 左侧图标，出现在单元格标题的左侧 */
  leftIcon: {
    type: Function as PropType<TdCellProps['leftIcon']>,
  },
  /** 展示右侧箭头 */
  link: {
    type: Boolean,
  },
  /** 列表外常驻文字，常用于辅助说明 */
  summary: {
    type: String,
    default: '',
  },
  /** 右侧内容 */
  value: {
    type: [String, Function] as PropType<TdCellProps['value']>,
  },
  /** 内容的对齐方式，默认右对齐 */
  valueAlign: {
    type: String as PropType<TdCellProps['valueAlign']>,
    default: 'right',
    validator(val: string): boolean {
      return ['left', 'right'].includes(val);
    },
  },
  /** 单元格点击时触发 */
  onClick: Function as PropType<TdCellProps['onClick']>,
};
