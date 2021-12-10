import _Divider from './divider.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const Divider: WithInstallType<typeof _Divider> = withInstall(_Divider);
export default Divider;
