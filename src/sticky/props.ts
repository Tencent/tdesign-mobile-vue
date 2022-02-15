/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdStickyProps } from './type';
import { PropType } from 'vue';

export default {
  /** 指定容器对应的NodesRef节点为组件的外部容器，滚动时组件会始终保持在容器范围内，当组件即将超出容器底部时，会返回原位置。 */
  container: {
    type: Object as PropType<TdStickyProps['container']>,
  },
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 吸顶时与顶部的距离，单位`px` */
  offsetTop: {
    type: Number,
    default: 0,
  },
  /** 吸顶时的 z-index */
  zIndex: {
    type: Number,
    default: 99,
  },
  /** 滚动时触发，scrollTop: 距离顶部位置，isFixed: 是否吸顶 */
  onScroll: Function as PropType<TdStickyProps['onScroll']>,
};
