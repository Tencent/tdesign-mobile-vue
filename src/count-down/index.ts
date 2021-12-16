import _Countdown from './count-down.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

export const Countdown: WithInstallType<typeof _Countdown> = withInstall(_Countdown);
