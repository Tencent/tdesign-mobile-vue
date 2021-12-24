/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-24 15:44:37
 * */

import { TdDropdownMenuProps } from './type';
import { PropType } from 'vue';

export default {
  /** 菜单标题和选项的选中态颜色 */
  activeColor: {
    type: String,
    default: '',
  },
  /** 是否在点击遮罩层后关闭菜单 */
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  /** 动画时长 */
  duration: {
    type: [String, Number] as PropType<TdDropdownMenuProps['duration']>,
    default: 200,
  },
  /** 是否显示遮罩层 */
  overlay: {
    type: Boolean,
    default: true,
  },
  /** 菜单栏 z-index 层级 */
  zIndex: {
    type: Number,
  },
};
