import Cell from './cell';
import _CellGroup from './cell-group';
import { withInstall, WithInstallType } from '../shared';
import { TdCellProps, TdCellGroupProps } from './type';

import './style';

export * from './type';
export type CellProps = TdCellProps;
export type CellGroupProps = TdCellGroupProps;

const _Cell: WithInstallType<typeof Cell> = withInstall(Cell);
export default _Cell;

export const CellGroup: WithInstallType<typeof _CellGroup> = withInstall(_CellGroup);
