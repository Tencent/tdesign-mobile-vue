import _Drawer from './drawer';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdDrawerProps } from './type';

export type DividerProps = TdDrawerProps;

export * from './type';
export * from './plugin';
export { default as DrawerPlugin } from './plugin';

const Drawer: WithInstallType<typeof _Drawer> = withInstall(_Drawer);
export default Drawer;
