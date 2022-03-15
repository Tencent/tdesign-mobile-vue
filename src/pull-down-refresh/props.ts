/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

 import { TdPullDownRefreshProps } from './type';
 import { PropType } from 'vue';
 
 export default {
   modelValue: {
     type: Boolean,
   },
   /** 加载中下拉高度 */
   loadingBarHeight: {
     type: Number,
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
   /** 最大下拉高度 */
   maxBarHeight: {
     type: Number,
     default: 80,
   },
   /** 刷新超时时间 */
   refreshTimeout: {
     type: Number,
     default: 3000,
   },
   /** 结束下拉时触发 */
   onRefresh: Function as PropType<TdPullDownRefreshProps['onRefresh']>,
   /** 刷新超时触发 */
   onTimeout: Function as PropType<TdPullDownRefreshProps['onTimeout']>,
 };