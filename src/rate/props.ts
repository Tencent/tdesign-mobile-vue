/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-25 11:35:55
 * */

import { TdRateProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许半选 */
  allowHalf: Boolean,
  /** 是否允许取消选择 */
  clearable: Boolean,
  /** 评分图标的颜色 */
  color: {
    type: String,
    default: '#ffc51c',
  },
  /** 评分的数量 */
  count: {
    type: Number,
    default: 5,
  },
  /** 默认值 */
  defaultValue: {
    type: Number,
    default: 3,
  },
  /** 默认值，非受控属性 */
  defaultDefaultValue: {
    type: Number,
    default: 3,
  },
  /** 是否为只读 */
  readonly: Boolean,
  /** 是否显示辅助文字 */
  showText: Boolean,
  /** 评分图标的大小 */
  size: {
    type: String,
    default: '48',
  },
  /** 自定义评分等级对应的辅助文字 */
  texts: {
    type: Array as PropType<TdRateProps['texts']>,
  },
  /** 选择评分的值 */
  value: {
    type: Number,
    required: true,
  },
  /** 选择评分的值，非受控属性 */
  defaultValue: {
    type: Number,
    required: true,
  },
  /** 评分数改变时触发 */
  onChange: Function as PropType<TdRateProps['onChange']>,
};
