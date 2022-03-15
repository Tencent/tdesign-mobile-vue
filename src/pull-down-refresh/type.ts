/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

 import { TdLoadingProps } from '../loading';

 export interface TdPullDownRefreshProps {
   /**
    * 加载中下拉高度
    * @default 200
    */
   loadingBarHeight?: number;
   /**
    * 加载loading样式
    */
   loadingProps?: TdLoadingProps;
   /**
    * 提示语，组件内部默认值为 ['下拉刷新', '松手刷新', '正在刷新', '刷新完成']
    * @default []
    */
   loadingTexts?: string[];
   /**
    * 最大下拉高度
    * @default 272
    */
   maxBarHeight?: number;
   /**
    * 刷新超时时间
    * @default 3000
    */
   refreshTimeout?: number;
   /**
    * 结束下拉时触发
    */
   onRefresh?: () => void;
   /**
    * 刷新超时触发
    */
   onTimeout?: () => void;
 }