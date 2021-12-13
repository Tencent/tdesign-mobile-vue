import _Countdown from './count-down.vue';
import { withInstall, WithInstallType, mapProps } from '../shared/';

import './style/';

export const Countdown: WithInstallType<typeof _Countdown> = withInstall(mapProps([
  {
    name: 'current',
    event: 'change',
    alias: ['modelValue'],
  },
])(_Countdown));
