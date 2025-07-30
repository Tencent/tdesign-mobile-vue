/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdListProps } from './type';
import { PropType } from 'vue';

export default {
  /** 自定义加载中。值为空不显示加载中，值为 'loading' 显示加载中状态，值为 'load-more' 显示加载更多状态。值类型为函数，则表示自定义加载状态呈现内容 */
  asyncLoading: {
    type: [String, Function] as PropType<TdListProps['asyncLoading']>,
  },
  /** 底部 */
  footer: {
    type: [String, Function] as PropType<TdListProps['footer']>,
  },
  /** 头部 */
  header: {
    type: [String, Function] as PropType<TdListProps['header']>,
  },
  /** 点击加载更多时触发 */
  onLoadMore: Function as PropType<TdListProps['onLoadMore']>,
  /** 列表滚动时触发，bottomDistance 表示底部距离；scrollTop 表示顶部滚动距离 */
  onScroll: Function as PropType<TdListProps['onScroll']>,
};
