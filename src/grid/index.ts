import LocalGrid from './grid';
import LocalGridItem from './grid-item';
import { withInstall, WithInstallType } from '../shared';

import { TdGridItemProps, TdGridProps } from './type';
import './style';

export * from './type';
export type GridProps = TdGridProps;
export type GridItemProps = TdGridItemProps;

export const Grid: WithInstallType<typeof LocalGrid> = withInstall(LocalGrid);
export const GridItem: WithInstallType<typeof LocalGridItem> = withInstall(LocalGridItem);
