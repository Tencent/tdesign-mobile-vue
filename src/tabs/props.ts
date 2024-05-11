/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTabsProps } from './type';
import { PropType } from 'vue';

export default {
  /** 动画效果设置。其中 duration 表示动画时长 */
  animation: {
    type: Object as PropType<TdTabsProps['animation']>,
  },
  /** 激活下划线的模式 */
  bottomLineMode: {
    type: String as PropType<TdTabsProps['bottomLineMode']>,
    default: 'fixed' as TdTabsProps['bottomLineMode'],
    validator(val: TdTabsProps['bottomLineMode']): boolean {
      if (!val) return true;
      return ['fixed', 'auto', 'full'].includes(val);
    },
  },
  /** 选项卡列表 */
  list: {
    type: Array as PropType<TdTabsProps['list']>,
  },
  /** 是否展示底部激活线条 */
  showBottomLine: {
    type: Boolean,
    default: true,
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdTabsProps['size']>,
    default: 'medium' as TdTabsProps['size'],
    validator(val: TdTabsProps['size']): boolean {
      if (!val) return true;
      return ['medium', 'large'].includes(val);
    },
  },
  /** 选项卡头部空间是否均分 */
  spaceEvenly: {
    type: Boolean,
    default: true,
  },
  /** 是否开启粘性布局 */
  sticky: Boolean,
  /** 透传至 Sticky 组件 */
  stickyProps: {
    type: Object as PropType<TdTabsProps['stickyProps']>,
  },
  /** 是否可以滑动切换 */
  swipeable: {
    type: Boolean,
    default: true,
  },
  /** 标签的样式 */
  theme: {
    type: String as PropType<TdTabsProps['theme']>,
    default: 'line' as TdTabsProps['theme'],
    validator(val: TdTabsProps['theme']): boolean {
      if (!val) return true;
      return ['line', 'tag', 'card'].includes(val);
    },
  },
  /** 激活的选项卡值 */
  value: {
    type: [String, Number] as PropType<TdTabsProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number] as PropType<TdTabsProps['value']>,
    default: undefined,
  },
  /** 激活的选项卡值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdTabsProps['defaultValue']>,
  },
  /** 激活的选项卡发生变化时触发 */
  onChange: Function as PropType<TdTabsProps['onChange']>,
  /** 点击选项卡时触发 */
  onClick: Function as PropType<TdTabsProps['onClick']>,
  /** 页面滚动时触发 */
  onScroll: Function as PropType<TdTabsProps['onScroll']>,
};
