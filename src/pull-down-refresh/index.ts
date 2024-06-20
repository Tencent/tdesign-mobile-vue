import _PullDownRefresh from './pull-down-refresh';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdPullDownRefreshProps } from './type';

export * from './type';
export type PullDownRefreshProps = TdPullDownRefreshProps;

export const PullDownRefresh: WithInstallType<typeof _PullDownRefresh> = withInstall(_PullDownRefresh);
export default PullDownRefresh;
