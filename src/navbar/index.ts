import _Navbar from './navbar';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdNavbarProps } from './type';

export * from './type';
export type NavbarProps = TdNavbarProps;

export const Navbar: WithInstallType<typeof _Navbar> = withInstall(_Navbar);
export default Navbar;
