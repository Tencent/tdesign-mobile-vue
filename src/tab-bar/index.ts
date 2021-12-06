import LocalTabBar from './tab-bar.vue';
import LocalTabBarItem from './tab-bar-item.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

export const TabBar: WithInstallType<typeof LocalTabBar> = withInstall(LocalTabBar);
export const TabBarItem: WithInstallType<typeof LocalTabBarItem> = withInstall(LocalTabBarItem);
