import Drawer from './drawer.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _Drawer: WithInstallType<typeof Drawer> = withInstall(Drawer);
export default _Drawer;
