/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdLoadingProps } from './type';
import { PropType } from 'vue';

export default {
  /** 子元素，同 content */
  default: {
    type: [String, Function] as PropType<TdLoadingProps['default']>,
  },
  /** 子元素 */
  content: {
    type: [String, Function] as PropType<TdLoadingProps['content']>,
  },
  /** 延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒 */
  delay: {
    type: Number,
    default: 0,
  },
  /** 加载动画执行完成一次的时间，单位：毫秒 */
  duration: {
    type: Number,
    default: 800,
  },
  /** 是否显示加载指示符 */
  indicator: {
    type: Boolean,
    default: true,
  },
  /** 是否继承父元素颜色 */
  inheritColor: Boolean,
  /** 对齐方式 */
  layout: {
    type: String as PropType<TdLoadingProps['layout']>,
    default: 'horizontal' as TdLoadingProps['layout'],
    validator(val: TdLoadingProps['layout']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 是否处于加载状态 */
  loading: {
    type: Boolean,
    default: true,
  },
  /** 是否暂停动画 */
  pause: Boolean,
  /** 加载进度 */
  progress: {
    type: Number,
  },
  /** 加载动画是否反向 */
  reverse: Boolean,
  /** 尺寸，示例：40rpx/20px */
  size: {
    type: String,
    default: '40rpx',
  },
  /** 加载提示文案 */
  text: {
    type: String,
  },
  /** 加载组件类型 */
  theme: {
    type: String as PropType<TdLoadingProps['theme']>,
    default: 'circular' as TdLoadingProps['theme'],
    validator(val: TdLoadingProps['theme']): boolean {
      if (!val) return true;
      return ['circular', 'spinner', 'bar', 'error', 'dots'].includes(val);
    },
  },
};
