import ButtonGroup from './button-group.vue';
import { withInstall, WithInstallType } from '../shared/';

import './style/';

const _ButtonGroup: WithInstallType<typeof ButtonGroup> = withInstall(ButtonGroup);
export default _ButtonGroup;
