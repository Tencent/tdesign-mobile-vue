import LocalDropdownMenu from './dropdown-menu';
import LocalDropdownItem from './dropdown-item';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdDropdownMenuProps, TdDropdownItemProps } from './type';

export * from './type';
export type DropdownMenuProps = TdDropdownMenuProps;
export type DropdownItemProps = TdDropdownItemProps;

export const DropdownMenu: WithInstallType<typeof LocalDropdownMenu> = withInstall(LocalDropdownMenu);
export const DropdownItem: WithInstallType<typeof LocalDropdownItem> = withInstall(LocalDropdownItem);
