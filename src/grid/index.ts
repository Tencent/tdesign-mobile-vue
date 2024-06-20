import _Grid from './grid';
import _GridItem from './grid-item';
import { withInstall, WithInstallType } from '../shared';

import { TdGridItemProps, TdGridProps } from './type';
import './style';

export * from './type';
export type GridProps = TdGridProps;
export type GridItemProps = TdGridItemProps;

export const Grid: WithInstallType<typeof _Grid> = withInstall(_Grid);
export const GridItem: WithInstallType<typeof _GridItem> = withInstall(_GridItem);
export default Grid;
