import { withInstall, WithInstallType } from '../shared';
import Progress from './progress.vue';

import './style';

const _Progress: WithInstallType<typeof Progress> = withInstall(Progress);
export default _Progress;
