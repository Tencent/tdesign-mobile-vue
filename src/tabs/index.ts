import { withInstall } from '../shared/';
import LocalTabs from './tabs.vue';
import LocalTabPanel from './tab-panel.vue';

export const Tabs = withInstall(LocalTabs);
export const TabPanel = withInstall(LocalTabPanel);
