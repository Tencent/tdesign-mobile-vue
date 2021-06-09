import Cell from './cell.vue';
import { withInstall, WithInstallType } from '../shared/';

import './style/';

const _Cell: WithInstallType<typeof Cell> = withInstall(Cell);
export default _Cell;
