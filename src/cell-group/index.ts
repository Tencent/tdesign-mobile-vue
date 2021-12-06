import CellGroup from './cell-group.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _CellGroup: WithInstallType<typeof CellGroup> = withInstall(CellGroup);
export default _CellGroup;
