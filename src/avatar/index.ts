import Avatar from './avatar.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdAvatarProps } from './type';

export * from './type';
export type AvatarProps = TdAvatarProps;

const _Avatar: WithInstallType<typeof Avatar> = withInstall(Avatar);
export default _Avatar;
