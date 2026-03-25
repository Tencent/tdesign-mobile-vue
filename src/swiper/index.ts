import _Swiper from './swiper';
import _SwiperItem from './swiper-item';
import { withInstall } from '../shared';
import { TdSwiperProps } from './type';

import './style';

export * from './type';

export interface SwiperToOptions {
  immediate?: boolean;
}

export interface SwiperInstanceFunctions {
  swipeTo?: (index: number, options?: SwiperToOptions) => void;
}

export type SwiperProps = TdSwiperProps;

export const Swiper = withInstall(_Swiper);
export const SwiperItem = withInstall(_SwiperItem);
export default Swiper;
