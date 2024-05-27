import LocalTabBar from './tab-bar';
import LocalTabBarItem from './tab-bar-item';
import { withInstall, WithInstallType } from '../shared';
import { TdTabBarProps, TdTabBarItemProps } from './type';

import './style';

export * from './type';
export type TabBarProps = TdTabBarProps;
export type TabBarItemProps = TdTabBarItemProps;

export const TabBar: WithInstallType<typeof LocalTabBar> = withInstall(LocalTabBar);
export const TabBarItem: WithInstallType<typeof LocalTabBarItem> = withInstall(LocalTabBarItem);
