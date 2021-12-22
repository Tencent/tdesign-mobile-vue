import Badge from './badge.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdBadgeProps } from './type';

import './style';

export * from './type';
export type BadgeProps = TdBadgeProps;

const _Badge: WithInstallType<typeof Badge> = withInstall(Badge);
export default _Badge;
