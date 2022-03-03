import _Divider from './divider.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdDividerProps } from './type';

export * from './type';
export type DividerProps = TdDividerProps;

const Divider: WithInstallType<typeof _Divider> = withInstall(_Divider);
export default Divider;
