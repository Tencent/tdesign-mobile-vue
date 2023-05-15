/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdNavbarProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否添加动画效果 */
  animation: {
    type: Boolean,
    default: true,
  },
  /** 左侧胶囊区域 */
  capsule: {
    type: Function as PropType<TdNavbarProps['capsule']>,
  },
  /** 是否固定在顶部 */
  fixed: {
    type: Boolean,
    default: true,
  },
  /** 左侧区域 */
  left: {
    type: Function as PropType<TdNavbarProps['left']>,
  },
  /** 是否展示左侧箭头 */
  leftArrow: {
    type: Boolean,
    default: false,
  },
  /** 右侧区域 */
  right: {
    type: Function as PropType<TdNavbarProps['right']>,
  },
  /** 页面标题 */
  title: {
    type: [String, Function] as PropType<TdNavbarProps['title']>,
  },
  /** 标题文字最大长度，超出的范围使用 `...` 表示 */
  titleMaxLength: {
    type: Number,
  },
  /** 是否显示 */
  visible: {
    type: Boolean,
    default: true,
  },
  /** 点击左侧区域时触发 */
  onLeftClick: Function as PropType<TdNavbarProps['onLeftClick']>,
  /** 点击右侧区域时触发 */
  onRightClick: Function as PropType<TdNavbarProps['onRightClick']>,
};
