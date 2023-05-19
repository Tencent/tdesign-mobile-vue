/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdIndexesProps } from './type';
import { PropType } from 'vue';

export default {
  /** 索引字符列表。不传默认 `A-Z` */
  indexList: {
    type: Array as PropType<TdIndexesProps['indexList']>,
  },
  /** 索引是否吸顶，默认为true */
  sticky: {
    type: Boolean,
    default: true,
  },
  /** 锚点吸顶时与顶部的距离	 */
  stickyOffset: {
    type: Number,
    default: 0,
  },
  /** 索引发生变更时触发事件 */
  onChange: Function as PropType<TdIndexesProps['onChange']>,
  /** 点击侧边栏时触发事件 */
  onSelect: Function as PropType<TdIndexesProps['onSelect']>,
};
