import _SideBar from './side-bar.vue';
import _SideBarItem from './side-bar-item.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdSideBarProps, TdSideBarItemProps } from './type';

import './style';

export * from './type';

export type SideBarProps = TdSideBarProps;
export type SideBarItemProps = TdSideBarItemProps;
export const SideBar: WithInstallType<typeof _SideBar> = withInstall(_SideBar);
export const SideBarItem: WithInstallType<typeof _SideBarItem> = withInstall(_SideBarItem);
