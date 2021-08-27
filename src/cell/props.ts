/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-27 17:26:31
 * */

import { TdCellProps } from './type';
import { PropType } from 'vue';

export default {
  /** 内容的对齐方式，默认居中对齐 */
  align: {
    type: String as PropType<TdCellProps['align']>,
    default: 'middle' as TdCellProps['align'],
    validator(val: TdCellProps['align']): boolean {
      return ['top', 'middle', 'bottom'].includes(val);
    },
  },
  /** 是否显示右侧箭头 */
  arrow: Boolean,
  /** 是否显示下边框 */
  bordered: {
    type: Boolean,
    default: true,
  },
  /** 下方内容描述 */
  description: {
    type: [String, Function] as PropType<TdCellProps['description']>,
  },
  /** 是否开启点击反馈 */
  hover: Boolean,
  /** 左侧图标，出现在单元格标题的左侧 */
  leftIcon: {
    type: Function as PropType<TdCellProps['leftIcon']>,
  },
  /** 和标题同行的说明文字 */
  note: {
    type: [String, Function] as PropType<TdCellProps['note']>,
  },
  /** 是否显示表单必填星号 */
  required: Boolean,
  /** 最右侧图标 */
  rightIcon: {
    type: Function as PropType<TdCellProps['rightIcon']>,
  },
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdCellProps['title']>,
  },
  /** 右侧内容 */
  onClick: Function as PropType<TdCellProps['onClick']>,
};
