import Cell from './cell.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdCellProps } from './type';

import './style';

export * from './type';
export type CellProps = TdCellProps;

const _Cell: WithInstallType<typeof Cell> = withInstall(Cell);
export default _Cell;
