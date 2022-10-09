import Cascader from './cascader.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdCascaderProps } from './type';

export * from './type';
export type CascaderProps = TdCascaderProps;

const _Cascader: WithInstallType<typeof Cascader> = withInstall(Cascader);
export default _Cascader;
