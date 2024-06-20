import _TabBar from './tab-bar';
import _TabBarItem from './tab-bar-item';
import { withInstall, WithInstallType } from '../shared';
import { TdTabBarProps, TdTabBarItemProps } from './type';

import './style';

export * from './type';
export type TabBarProps = TdTabBarProps;
export type TabBarItemProps = TdTabBarItemProps;

export const TabBar: WithInstallType<typeof _TabBar> = withInstall(_TabBar);
export const TabBarItem: WithInstallType<typeof _TabBarItem> = withInstall(_TabBarItem);
export default TabBar;
