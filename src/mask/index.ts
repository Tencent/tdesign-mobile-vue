import { withInstall, WithInstallType } from '../shared';
import Mask from './mask.vue';

import './style';

const _Mask: WithInstallType<typeof Mask> = withInstall(Mask);
export default _Mask;
