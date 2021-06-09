import Fab from './fab.vue';
import { withInstall, WithInstallType } from '../shared/';

import './style/';

const _Fab: WithInstallType<typeof Fab> = withInstall(Fab);
export default _Fab;
