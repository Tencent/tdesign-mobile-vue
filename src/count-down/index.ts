import _Countdown from './count-down.vue';
import { withInstall, WithInstallType, mapProps } from '../shared';

import './style';

export const Swiper: WithInstallType<typeof _Countdown> = withInstall(
  mapProps([
    {
      name: 'current',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Countdown),
);
