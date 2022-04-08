import _Avatar from './avatar.vue';
import _AvatarGroup from './avatar-group.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdAvatarProps, TdAvatarGroupProps } from './type';

export * from './type';
export type AvatarProps = TdAvatarProps;
export type AvatarGroupProps = TdAvatarGroupProps;

const Avatar: WithInstallType<typeof _Avatar> = withInstall(_Avatar);
export const AvatarGroup: WithInstallType<typeof _AvatarGroup> = withInstall(_AvatarGroup);
export default Avatar;
