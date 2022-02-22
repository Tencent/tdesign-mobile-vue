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
  /** 选项卡列表 */
  list: {
    type: Array as PropType<TdTabsProps['list']>,
  },
  /** 选项卡位置 */
  placement: {
    type: String as PropType<TdTabsProps['placement']>,
    default: 'top' as TdTabsProps['placement'],
    validator(val: TdTabsProps['placement']): boolean {
      return ['left', 'top'].includes(val!);
    },
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
      return ['medium', 'large'].includes(val!);
    },
  },
  /** 激活的选项卡值 */
  value: {
    type: [String, Number] as PropType<TdTabsProps['value']>,
  },
  /** 激活的选项卡值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdTabsProps['defaultValue']>,
  },
  /** 激活的选项卡发生变化时触发 */
  onChange: Function as PropType<TdTabsProps['onChange']>,
};
