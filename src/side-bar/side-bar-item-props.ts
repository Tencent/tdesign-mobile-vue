/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSideBarItemProps } from '../side-bar/type';
import { PropType } from 'vue';

export default {
  /** 透传至 Badge 组件 */
  badgeProps: {
    type: Object as PropType<TdSideBarItemProps['badgeProps']>,
  },
  /** 是否禁用 */
  disabled: Boolean,
  /** 图标 */
  icon: {
    type: Function as PropType<TdSideBarItemProps['icon']>,
  },
  /** 展示的标签 */
  label: {
    type: String,
    default: '',
  },
  /** 当前选项的值 */
  value: {
    type: [String, Number] as PropType<TdSideBarItemProps['value']>,
  },
};
