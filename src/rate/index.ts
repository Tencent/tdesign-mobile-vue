import Rate from './rate.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _Rate: WithInstallType<typeof Rate> = withInstall(Rate);
export default _Rate;
