import _BaseTable from './base-table';
import _PrimaryTable from './primary-table';
import { withInstall } from '../shared';

import './style';
import { TdPrimaryTableProps } from './type';

export type TableProps = TdPrimaryTableProps;

export * from './type';
export * from './interface';

export const BaseTable = withInstall(_BaseTable, 'TBaseTable');
export const PrimaryTable = withInstall(_PrimaryTable, 'TTable');
export const Table = PrimaryTable;

export default Table;
