import _Tabs from './tabs';
import _TabPanel from './tab-panel';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdTabPanelProps, TdTabsProps } from './type';

export * from './type';
export type TabsProps = TdTabsProps;
export type TabPanelProps = TdTabPanelProps;

export const Tabs: WithInstallType<typeof _Tabs> = withInstall(_Tabs);
export const TabPanel: WithInstallType<typeof _TabPanel> = withInstall(_TabPanel);
export default Tabs;
