import LocalTabs from './tabs.vue';
import LocalTabPanel from './tab-panel.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdTabPanelProps, TdTabsProps } from './type';

export * from './type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

export const Tabs: WithInstallType<typeof LocalTabs> = withInstall(LocalTabs);
export const TabPanel: WithInstallType<typeof LocalTabPanel> = withInstall(LocalTabPanel);
