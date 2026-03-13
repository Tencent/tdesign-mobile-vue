import _Grid from './grid';
import _GridItem from './grid-item';
import { withInstall } from '../shared';

import { TdGridItemProps, TdGridProps } from './type';
import './style';

export * from './type';
export type GridProps = TdGridProps;
export type GridItemProps = TdGridItemProps;

export const Grid = withInstall(_Grid);
export const GridItem = withInstall(_GridItem);
export default Grid;
