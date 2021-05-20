import Switch from './switch.vue';
import { withInstall, WithInstallType } from '../shared/';

import './style/';

const _Switch: WithInstallType<typeof Switch> = withInstall(Switch);
export default _Switch;
