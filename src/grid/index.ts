import LocalGrid from './grid.vue';
import LocalGridItem from './grid-item.vue';
import { withInstall, WithInstallType } from '../shared';

// import { TdGridItemProps } from './type';
// import './style';

// export * from './type';
// export type GridItemProps = TdGridItemProps;

export const Grid: WithInstallType<typeof LocalGrid> = withInstall(LocalGrid);
export const GridItem: WithInstallType<typeof LocalGridItem> = withInstall(LocalGridItem);
