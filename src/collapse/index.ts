import LocalCollapse from './collapse.vue';
import LocalCollapsePanel from './collapse-panel.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

export const Collapse: WithInstallType<typeof LocalCollapse> = withInstall(LocalCollapse);
export const CollapsePanel: WithInstallType<typeof LocalCollapsePanel> = withInstall(LocalCollapsePanel);
