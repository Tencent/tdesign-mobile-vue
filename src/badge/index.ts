import _Badge from './badge';
import { withInstall } from '../shared';
import { TdBadgeProps } from './type';

import './style';

export * from './type';
export type BadgeProps = TdBadgeProps;

export const Badge = withInstall(_Badge);
export default Badge;
