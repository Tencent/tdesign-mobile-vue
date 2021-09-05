import _Swiper from './swiper.vue';
import _SwiperItem from './swiper-item.vue';
import { withInstall, WithInstallType } from '../shared/';

import './style/';

export const Swiper: WithInstallType<typeof _Swiper> = withInstall(_Swiper);
export const SwiperItem: WithInstallType<typeof _SwiperItem> = withInstall(_SwiperItem);
