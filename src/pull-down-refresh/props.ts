/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdPullDownRefreshProps } from './type';
import { PropType } from 'vue';

export default {
  /** 加载中下拉高度，如果值为数字则单位是：'px' */
  loadingBarHeight: {
    type: [String, Number] as PropType<TdPullDownRefreshProps['loadingBarHeight']>,
    default: 50,
  },
  /** 加载loading样式 */
  loadingProps: {
    type: Object as PropType<TdPullDownRefreshProps['loadingProps']>,
  },
  /** 提示语，组件内部默认值为 ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'] */
  loadingTexts: {
    type: Array as PropType<TdPullDownRefreshProps['loadingTexts']>,
    default: (): TdPullDownRefreshProps['loadingTexts'] => [],
  },
  /** 最大下拉高度，如果值为数字则单位是：'px' */
  maxBarHeight: {
    type: [String, Number] as PropType<TdPullDownRefreshProps['maxBarHeight']>,
    default: 80,
  },
  /** 刷新超时时间 */
  refreshTimeout: {
    type: Number,
    default: 3000,
  },
  /** 组件状态，值为 `true` 表示下拉状态，值为 `false` 表示收起状态 */
  value: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 组件状态，值为 `true` 表示下拉状态，值为 `false` 表示收起状态，非受控属性 */
  defaultValue: Boolean,
  /** 下拉或收起时触发，用户手势往下滑动触发下拉状态，手势松开触发收起状态 */
  onChange: Function as PropType<TdPullDownRefreshProps['onChange']>,
  /** 结束下拉时触发 */
  onRefresh: Function as PropType<TdPullDownRefreshProps['onRefresh']>,
  /** 刷新超时触发 */
  onTimeout: Function as PropType<TdPullDownRefreshProps['onTimeout']>,
};
