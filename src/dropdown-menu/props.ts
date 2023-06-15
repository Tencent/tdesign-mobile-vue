/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDropdownMenuProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否在点击遮罩层后关闭菜单 */
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  /** 菜单展开方向 */
  direction: {
    type: String as PropType<TdDropdownMenuProps['direction']>,
    default: 'down' as TdDropdownMenuProps['direction'],
    validator(val: TdDropdownMenuProps['direction']): boolean {
      if (!val) return true;
      return ['down', 'up'].includes(val);
    },
  },
  /** 动画时长 */
  duration: {
    type: [String, Number] as PropType<TdDropdownMenuProps['duration']>,
    default: 200,
  },
  /** 是否显示遮罩层 */
  showOverlay: {
    type: Boolean,
    default: true,
  },
  /** 菜单栏 z-index 层级 */
  zIndex: {
    type: Number,
    default: 11600,
  },
};
