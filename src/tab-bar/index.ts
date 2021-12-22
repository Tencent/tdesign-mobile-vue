import LocalTabBar from './tab-bar.vue';
import LocalTabBarItem from './tab-bar-item.vue';
import { withInstall, WithInstallType, mapProps } from '../shared';

import './style';

export const TabBar: WithInstallType<typeof LocalTabBar> = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(LocalTabBar),
);
export const TabBarItem: WithInstallType<typeof LocalTabBarItem> = withInstall(LocalTabBarItem);
