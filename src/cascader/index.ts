import _Cascader from './cascader.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdCascaderProps } from './type';

export * from './type';
export type CascaderProps = TdCascaderProps;

export const Cascader: WithInstallType<typeof _Cascader> = withInstall(_Cascader);
export default Cascader;
