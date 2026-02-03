import _Avatar from './avatar';
import _AvatarGroup from './avatar-group';
import { withInstall } from '../shared';

import './style';
import { TdAvatarProps, TdAvatarGroupProps } from './type';

export * from './type';
export type AvatarProps = TdAvatarProps;
export type AvatarGroupProps = TdAvatarGroupProps;

export const Avatar = withInstall(_Avatar);
export const AvatarGroup = withInstall(_AvatarGroup);
export default Avatar;
