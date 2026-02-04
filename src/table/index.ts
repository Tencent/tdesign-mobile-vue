import BaseTable from './base-table';
import { withInstall } from '../shared';

import './style';
import { TdBaseTableProps } from './type';

export type TableProps = TdBaseTableProps;

export * from './type';
export * from './interface';

export const Table = withInstall(BaseTable, 'TTable');
export default Table;
