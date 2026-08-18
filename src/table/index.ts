import { cloneDeep } from 'lodash-es';
import _BaseTable from './base-table';
import _PrimaryTable from './primary-table';
import { withInstall } from '../shared';

import './style';
import { TdBaseTableProps } from './type';

export type TableProps = TdBaseTableProps;

export * from './type';
export * from './interface';

export const BaseTable = withInstall(_BaseTable, 'TBaseTable');
export const PrimaryTable = withInstall(_PrimaryTable, 'TPrimaryTable');

// Table 组件默认等价于 PrimaryTable，克隆一份组件定义以避免复用同一份install 方法
const table = cloneDeep(_PrimaryTable);
export const Table = withInstall(table, 'TTable');

export default Table;
