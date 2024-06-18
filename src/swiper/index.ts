import _Swiper from './swiper';
import _SwiperItem from './swiper-item';
import { withInstall, WithInstallType } from '../shared';
import { TdSwiperProps } from './type';

import './style';

export * from './type';
export type SwiperProps = TdSwiperProps;

export const Swiper: WithInstallType<typeof _Swiper> = withInstall(_Swiper);
export const SwiperItem: WithInstallType<typeof _SwiperItem> = withInstall(_SwiperItem);
