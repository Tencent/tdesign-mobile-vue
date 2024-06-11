/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdLoadingProps } from './type';
import { PropType } from 'vue';

export default {
  /** 挂载元素，默认挂载到组件本身所在的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  attach: {
    type: [String, Function] as PropType<TdLoadingProps['attach']>,
    default: '',
  },
  /** 子元素 */
  content: {
    type: [String, Function] as PropType<TdLoadingProps['content']>,
  },
  /** 子元素，同 content */
  default: {
    type: [String, Function] as PropType<TdLoadingProps['default']>,
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
  /** 是否显示为全屏加载 */
  fullscreen: Boolean,
  /** 加载指示符，值为 true 显示默认指示符，值为 false 则不显示，也可以自定义指示符 */
  indicator: {
    type: [Boolean, Function] as PropType<TdLoadingProps['indicator']>,
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
  /** 加载动画是否反向 */
  reverse: Boolean,
  /** 尺寸，示例：20px */
  size: {
    type: String,
    default: '20px',
  },
  /** 加载提示文案 */
  text: {
    type: [String, Function] as PropType<TdLoadingProps['text']>,
  },
  /** 加载组件类型 */
  theme: {
    type: String as PropType<TdLoadingProps['theme']>,
    default: 'circular' as TdLoadingProps['theme'],
    validator(val: TdLoadingProps['theme']): boolean {
      if (!val) return true;
      return ['circular', 'spinner', 'dots'].includes(val);
    },
  },
};
