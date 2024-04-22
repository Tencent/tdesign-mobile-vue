import { withInstall, WithInstallType } from '../shared';
import LocalIndexes from './indexes';
import LocalIndexesAnchor from './indexes-anchor';

import './style';

export const Indexes: WithInstallType<typeof LocalIndexes> = withInstall(LocalIndexes);
export const IndexesAnchor: WithInstallType<typeof LocalIndexesAnchor> = withInstall(LocalIndexesAnchor);
