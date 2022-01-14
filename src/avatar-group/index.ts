import AvatarGroup from './avatar-group.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdAvatarGroupProps } from './type';

export * from './type';
export type AvatarGroupProps = TdAvatarGroupProps;

const _AvatarGroup: WithInstallType<typeof AvatarGroup> = withInstall(AvatarGroup);
export default _AvatarGroup;
