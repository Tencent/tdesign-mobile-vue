/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdBackTopProps } from './type';
import { PropType } from 'vue';

export default {
  /** 滚动的容器 */
  container: {
    type: Function as PropType<TdBackTopProps['container']>,
  },
  /** 是否绝对定位固定到屏幕右下方 */
  fixed: {
    type: Boolean,
    default: true,
  },
  /** 图标 */
  icon: {
    type: [Boolean, Function] as PropType<TdBackTopProps['icon']>,
    default: true,
  },
  /** 定位滚动到指定对象 */
  target: {
    type: Function as PropType<TdBackTopProps['target']>,
  },
  /** 文案 */
  text: {
    type: String,
    default: '',
  },
  /** 预设的样式类型 */
  theme: {
    type: String as PropType<TdBackTopProps['theme']>,
    default: 'round' as TdBackTopProps['theme'],
    validator(val: TdBackTopProps['theme']): boolean {
      if (!val) return true;
      return ['round', 'half-round', 'round-dark', 'half-round-dark'].includes(val);
    },
  },
  /** 滚动高度达到此参数值才出现 */
  visibilityHeight: {
    type: Number,
    default: 200,
  },
  /** 点击触发 */
  onToTop: Function as PropType<TdBackTopProps['onToTop']>,
};
