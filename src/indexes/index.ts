import { withInstall, WithInstallType } from '../shared/';
import LocalIndexes from './indexes.vue';
import LocalIndexesCell from './indexes-cell.vue';
import LocalIndexesAnchor from './indexes-anchor.vue';

import './style/';

export const Indexes: WithInstallType<typeof LocalIndexes> = withInstall(LocalIndexes);
export const IndexesCell: WithInstallType<typeof LocalIndexesCell> = withInstall(LocalIndexesCell);
export const IndexesAnchor: WithInstallType<typeof LocalIndexesAnchor> = withInstall(LocalIndexesAnchor);
