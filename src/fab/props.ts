/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdFabProps } from './type';
import { PropType } from 'vue';

export default {
  /** 透传至 Button 组件 */
  buttonProps: {
    type: Object as PropType<TdFabProps['buttonProps']>,
  },
  /** 图标 */
  icon: {
    type: Function as PropType<TdFabProps['icon']>,
  },
  /** 悬浮按钮的样式，常用于调整位置 */
  style: {
    type: String,
    default: 'right: 16px; bottom: 32px;',
  },
  /** 文本内容 */
  text: {
    type: String,
    default: '',
  },
  /** 悬浮按钮点击事件 */
  onClick: Function as PropType<TdFabProps['onClick']>,
  /** 是否可拖拽 */
  draggable: {
    type: Boolean,
    default: false,
  },
};
