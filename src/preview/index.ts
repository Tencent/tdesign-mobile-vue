import { withInstall, WithInstallType } from '../shared';
import Preview from './preview.vue';

import './style';

const _Preview: WithInstallType<typeof Preview> = withInstall(Preview);
export default _Preview;
