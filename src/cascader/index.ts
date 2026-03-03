import _Cascader from './cascader';
import { withInstall } from '../shared';

import './style';
import { TdCascaderProps } from './type';

export * from './type';
export type CascaderProps = TdCascaderProps;

export const Cascader = withInstall(_Cascader);
export default Cascader;
