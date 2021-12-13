import Countdown from './count-down.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _Countdown: WithInstallType<typeof Countdown> = withInstall(Countdown);
export default _Countdown;
