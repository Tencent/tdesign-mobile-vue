import _DropdownMenu from './dropdown-menu';
import _DropdownItem from './dropdown-item';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdDropdownMenuProps, TdDropdownItemProps } from './type';

export * from './type';
export type DropdownMenuProps = TdDropdownMenuProps;
export type DropdownItemProps = TdDropdownItemProps;

export const DropdownMenu: WithInstallType<typeof _DropdownMenu> = withInstall(_DropdownMenu);
export const DropdownItem: WithInstallType<typeof _DropdownItem> = withInstall(_DropdownItem);
export default DropdownMenu;
