import _Divider from './divider';
import { withInstall } from '../shared';

import './style';

import { TdDividerProps } from './type';

export * from './type';
export type DividerProps = TdDividerProps;

export const Divider = withInstall(_Divider);
export default Divider;
