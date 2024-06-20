import _SwipeCell from './swipe-cell.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdSwipeCellProps } from './type';

import './style';

export * from './type';
export type SwipeCellProps = TdSwipeCellProps;

export const SwipeCell: WithInstallType<typeof _SwipeCell> = withInstall(_SwipeCell);
export default SwipeCell;
