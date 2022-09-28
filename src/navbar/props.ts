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
  /** 背景 */
  background: {
    type: String,
    default: '',
  },
  /** 是否固定在顶部 */
  fixed: {
    type: Boolean,
    default: true,
  },
  /** 首页图标。值为 true 表示显示默认返回图标，值为 false 表示不显示首页图标，值为其他表示自定义图标 */
  homeIcon: {
    type: [Boolean, Function] as PropType<TdNavbarProps['homeIcon']>,
  },
  /** 左侧图标。值为 true 表示显示默认返回图标，值为 false 表示不显示左侧图标，值为其他表示自定义图标 */
  leftIcon: {
    type: [Boolean, Function] as PropType<TdNavbarProps['leftIcon']>,
    default: false,
  },
  /** 右侧图标，可自定义 */
  rightIcon: {
    type: Function as PropType<TdNavbarProps['rightIcon']>,
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
  /** 点击 home 图标时触发 */
  onHomeClick: Function as PropType<TdNavbarProps['onHomeClick']>,
  /** 点击左边按钮时触发 */
  onLeftClick: Function as PropType<TdNavbarProps['onLeftClick']>,
};
