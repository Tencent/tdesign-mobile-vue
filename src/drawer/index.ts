import _Drawer from './drawer';
import { withInstall } from '../shared';

import './style';

import { TdDrawerProps } from './type';

export type DrawerProps = TdDrawerProps;

export * from './type';
export * from './plugin';

export const Drawer = withInstall(_Drawer);
export default Drawer;
