import _Swiper from './swiper.vue';
import _SwiperItem from './swiper-item.vue';
import { withInstall, WithInstallType, mapProps } from '../shared';

import './style';

export const Swiper: WithInstallType<typeof _Swiper> = withInstall(
  mapProps([
    {
      name: 'current',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Swiper),
);
export const SwiperItem: WithInstallType<typeof _SwiperItem> = withInstall(_SwiperItem);
