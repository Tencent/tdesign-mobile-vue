import Loading from './loading';
import { withInstall, WithInstallType } from '../shared';

import { TdLoadingProps } from './type';
import './style';

export * from './type';
export * from './plugin';
export { default as LoadingPlugin } from './plugin';

export type LoadingProps = TdLoadingProps;

const _Loading: WithInstallType<typeof Loading> = withInstall(Loading);
export default _Loading;
