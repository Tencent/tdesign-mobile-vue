import _Divider from './divider';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdDividerProps } from './type';

export * from './type';
export type DividerProps = TdDividerProps;

export const Divider: WithInstallType<typeof _Divider> = withInstall(_Divider);
export default Divider;
