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
  /** 是否可拖拽。`true` / `'all'`可拖动<br>`'vertical'`可垂直拖动<br>`'horizontal'`可水平拖动<br>`false`禁止拖动 */
  draggable: {
    type: [String, Boolean] as PropType<TdFabProps['draggable']>,
    default: false as TdFabProps['draggable'],
  },
  /** 图标 */
  icon: {
    type: Function as PropType<TdFabProps['icon']>,
  },
  /** 是否吸附。`true` 启用左右吸附，`left` 仅吸附到左边，`right` 仅吸附到右边，`false` 不吸附 */
  magnet: {
    type: [String, Boolean] as PropType<TdFabProps['magnet']>,
  },
  /** 悬浮按钮的样式，常用于调整位置 */
  style: {
    type: [String, Object] as PropType<TdFabProps['style']>,
    default: 'right: 16px; bottom: 32px;' as TdFabProps['style'],
  },
  /** 文本内容 */
  text: {
    type: String,
    default: '',
  },
  /** 设置水平方向边界限制，示例：[16, 16] 或 ['16px', 16] */
  xBounds: {
    type: Array as PropType<TdFabProps['xBounds']>,
  },
  /** 设置垂直方向边界限制，示例：[48, 48] 或 ['96px', 80] */
  yBounds: {
    type: Array as PropType<TdFabProps['yBounds']>,
  },
  /** 悬浮按钮点击事件 */
  onClick: Function as PropType<TdFabProps['onClick']>,
  /** 结束拖拽时触发 */
  onDragEnd: Function as PropType<TdFabProps['onDragEnd']>,
  /** 开始拖拽时触发 */
  onDragStart: Function as PropType<TdFabProps['onDragStart']>,
};
