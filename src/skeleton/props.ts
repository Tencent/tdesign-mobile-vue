/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSkeletonProps } from './type';
import { PropType } from 'vue';

export default {
  /** 动画效果，有「渐变加载动画」和「闪烁加载动画」两种。值为空则表示没有动画 */
  animation: {
    type: String as PropType<TdSkeletonProps['animation']>,
    validator(val: TdSkeletonProps['animation']): boolean {
      if (!val) return true;
      return ['gradient', 'flashed'].includes(val);
    },
  },
  /** 加载完成的内容 */
  content: {
    type: [String, Function] as PropType<TdSkeletonProps['content']>,
  },
  /** 加载完成的内容，同 content */
  default: {
    type: [String, Function] as PropType<TdSkeletonProps['default']>,
  },
  /** 【开发中】延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒 */
  delay: {
    type: Number,
    default: 0,
  },
  /** 是否为加载状态，如果是则显示骨架图，如果不是则显示加载完成的内容 */
  loading: {
    type: Boolean,
    default: true,
  },
  /** 用于设置行列数量、宽度高度、间距等。【示例一】，`[1, 1, 2]` 表示输出三行骨架图，第一行一列，第二行一列，第三行两列。【示例二】，`[1, 1, { width: '100px' }]` 表示自定义第三行的宽度为 `100px`。【示例三】，`[1, 2, [{ width, height }, { width, height, marginLeft }]]` 表示第三行有两列，且自定义宽度、高度和间距 */
  rowCol: {
    type: Array as PropType<TdSkeletonProps['rowCol']>,
    default: [1, 1, 1, { width: '70%' }],
  },
  /** 骨架图风格，有基础、头像组合等两大类 */
  theme: {
    type: String as PropType<TdSkeletonProps['theme']>,
    default: 'text' as TdSkeletonProps['theme'],
    validator(val: TdSkeletonProps['theme']): boolean {
      if (!val) return true;
      return ['text', 'avatar-text'].includes(val);
    },
  },
};
