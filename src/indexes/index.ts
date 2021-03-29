import { withInstall } from '../shared/';
import LocalIndexes from './indexes.vue';
import LocalIndexesCell from './indexes-cell.vue';
import LocalIndexesAnchor from './indexes-anchor.vue';

export const Indexes = withInstall(LocalIndexes);
export const IndexesCell = withInstall(LocalIndexesCell);
export const IndexesAnchor = withInstall(LocalIndexesAnchor);
