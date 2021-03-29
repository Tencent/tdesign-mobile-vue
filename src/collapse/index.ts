import { withInstall } from '../shared/';
import LocalCollapse from './collapse.vue';
import LocalCollapsePanel from './collapse-panel.vue';

export const Collapse = withInstall(LocalCollapse);
export const CollapsePanel = withInstall(LocalCollapsePanel);
