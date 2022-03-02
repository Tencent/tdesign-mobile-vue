import Loading from './loading.vue';
import { withInstall, WithInstallType } from '../shared';

import { TdLoadingProps } from './type';
import './style';

export * from './type';
export type LoadingProps = TdLoadingProps;

const _Loading: WithInstallType<typeof Loading> = withInstall(Loading);
export default _Loading;
