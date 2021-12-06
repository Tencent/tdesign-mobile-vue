import Radio from './radio.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _Radio: WithInstallType<typeof Radio> = withInstall(Radio);
export default _Radio;
