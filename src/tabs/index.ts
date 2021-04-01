import { withInstall } from '../shared/';
import LocalTabs from './tabs.vue';
import LocalTabPanel from './tab-panel.vue';

import './style/';

export const Tabs = withInstall(LocalTabs);
export const TabPanel = withInstall(LocalTabPanel);
