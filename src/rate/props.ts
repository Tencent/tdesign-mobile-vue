/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-04-12 16:32:20
 * */

import { TdRateProps } from '@TdTypes/rate/TdRateProps';
import { PropType } from 'vue';

export default {
  /** 是否允许半选 */
  allowHalf: Boolean,
  /** 是否允许取消选择 */
  clearable: Boolean,
  /** 评分图标的颜色 */
  color: {
    type: String,
    default: '',
  },
  /** 评分的数量 */
  count: {
    type: Number,
    default: 5,
  },
  /** 是否为只读 */
  readonly: Boolean,
  /** 是否显示辅助文字 */
  showText: Boolean,
  /** 评分图标的大小 */
  size: {
    type: String,
    default: '',
  },
  /** 自定义评分等级对应的辅助文字 */
  texts: {
    type: Array as PropType<TdRateProps['texts']>,
  },
  /** 选择评分的值 */
  value: {
    type: Number,
    default: 0,
    required: true,
  },
  /** 选择评分的值，非受控属性 */
  defaultValue: {
    type: Number,
    default: 0,
    required: true,
  },
  /** 评分数改变时触发 */
  onChange: Function as PropType<TdRateProps['onChange']>,
};
