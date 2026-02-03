import _SideBar from './side-bar';
import _SideBarItem from './side-bar-item';
import { withInstall } from '../shared';
import { TdSideBarProps, TdSideBarItemProps } from './type';

import './style';

export * from './type';

export type SideBarProps = TdSideBarProps;
export type SideBarItemProps = TdSideBarItemProps;

export const SideBar = withInstall(_SideBar);
export const SideBarItem = withInstall(_SideBarItem);
export default SideBar;
