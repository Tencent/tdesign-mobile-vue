import CellGroup from './cell-group.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdCellGroupProps } from './type';

export * from './type';
export type CellGroupProps = TdCellGroupProps;

const _CellGroup: WithInstallType<typeof CellGroup> = withInstall(CellGroup);
export default _CellGroup;
