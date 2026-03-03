import _SwipeCell from './swipe-cell';
import { withInstall } from '../shared';
import { TdSwipeCellProps } from './type';

import './style';

export * from './type';
export type SwipeCellProps = TdSwipeCellProps;

export const SwipeCell = withInstall(_SwipeCell);
export default SwipeCell;
