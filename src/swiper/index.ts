import _Swiper from './swiper';
import _SwiperItem from './swiper-item';
import { withInstall } from '../shared';
import { TdSwiperProps, SwiperChangeSource } from './type';

import './style';

export * from './type';

export interface SwiperToOptions {
  /**
   * 是否立即切换(无动画)
   * @default false
   */
  immediate?: boolean;
}

export interface SwiperInstance {
  /**
   * 切换到指定索引
   */
  swipeTo: (index: number, options?: SwiperToOptions) => void;
  /**
   * 切换到上一项
   */
  goPrev: (source: SwiperChangeSource) => void;
  /**
   * 切换到下一项
   */
  goNext: (source: SwiperChangeSource) => void;
  /**
   * 设置偏移量
   */
  setOffset: (offset: number, direction?: 'X' | 'Y') => void;
  /**
   * Swiper 容器元素引用
   */
  swiperContainer: HTMLElement | null;
}

export type SwiperProps = TdSwiperProps;

export const Swiper = withInstall(_Swiper);
export const SwiperItem = withInstall(_SwiperItem);
export default Swiper;
