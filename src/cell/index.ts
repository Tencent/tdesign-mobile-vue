import _Cell from './cell';
import _CellGroup from './cell-group';
import { withInstall, WithInstallType } from '../shared';
import { TdCellProps, TdCellGroupProps } from './type';

import './style';

export * from './type';
export type CellProps = TdCellProps;
export type CellGroupProps = TdCellGroupProps;

export const Cell: WithInstallType<typeof _Cell> = withInstall(_Cell);
export const CellGroup: WithInstallType<typeof _CellGroup> = withInstall(_CellGroup);
export default Cell;
