/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-21 19:16:47
 * */

import { TdTabBarProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否显示外边框 */
  bordered: {
    type: Boolean,
    default: true,
  },
  /** 是否固定在底部 */
  fixed: {
    type: Boolean,
    default: true,
  },
  /** 当前选中标签的索引 */
  value: {
    type: [String, Number, Array] as PropType<TdTabBarProps['value']>,
    default: 0,
  },
  /** 选中标签切换时触发 */
  onChange: Function as PropType<TdTabBarProps['onChange']>,
};
