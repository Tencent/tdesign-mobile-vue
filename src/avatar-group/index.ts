import AvatarGroup from './avatar-group.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _AvatarGroup: WithInstallType<typeof AvatarGroup> = withInstall(AvatarGroup);
export default _AvatarGroup;
