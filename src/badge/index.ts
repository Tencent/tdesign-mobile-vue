import Badge from './badge.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _Badge: WithInstallType<typeof Badge> = withInstall(Badge);
export default _Badge;
