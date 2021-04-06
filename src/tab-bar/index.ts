import { withInstall } from '../shared/';
import LocalTabBar from './tab-bar.vue';
import LocalTabBarItem from './tab-bar-item.vue';

import './style/';

export const TabBar = withInstall(LocalTabBar);
export const TabBarItem = withInstall(LocalTabBarItem);
