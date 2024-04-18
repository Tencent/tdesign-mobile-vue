import LocalCollapse from './collapse';
import LocalCollapsePanel from './collapse-panel';
import { withInstall, WithInstallType } from '../shared';

import './style';

export const Collapse: WithInstallType<typeof LocalCollapse> = withInstall(LocalCollapse);
export const CollapsePanel: WithInstallType<typeof LocalCollapsePanel> = withInstall(LocalCollapsePanel);
