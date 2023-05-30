import BaseTable from './base-table.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

export * from './type';
export * from './interface';

const _BaseTable: WithInstallType<typeof BaseTable> = withInstall(BaseTable, 'TTable');

export default _BaseTable;
