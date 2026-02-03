import _DropdownMenu from './dropdown-menu';
import _DropdownItem from './dropdown-item';
import { withInstall } from '../shared';

import './style';

import { TdDropdownMenuProps, TdDropdownItemProps } from './type';

export * from './type';
export type DropdownMenuProps = TdDropdownMenuProps;
export type DropdownItemProps = TdDropdownItemProps;

export const DropdownMenu = withInstall(_DropdownMenu);
export const DropdownItem = withInstall(_DropdownItem);
export default DropdownMenu;
