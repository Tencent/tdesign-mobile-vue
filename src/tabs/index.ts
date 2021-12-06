import LocalTabs from './tabs.vue';
import LocalTabPanel from './tab-panel.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

export const Tabs: WithInstallType<typeof LocalTabs> = withInstall(LocalTabs);
export const TabPanel: WithInstallType<typeof LocalTabPanel> = withInstall(LocalTabPanel);
