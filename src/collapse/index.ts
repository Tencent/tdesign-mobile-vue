import { withInstall } from '../shared/';
import LocalCollapse from './collapse.vue';
import LocalCollapsePanel from './collapse-panel.vue';

import './style/';

export const Collapse = withInstall(LocalCollapse);
export const CollapsePanel = withInstall(LocalCollapsePanel);
