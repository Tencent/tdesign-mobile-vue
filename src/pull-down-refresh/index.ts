import PullDownRefresh from './pull-down-refresh.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdPullDownRefreshProps } from './type';

export * from './type';
export type PullDownRefreshProps = TdPullDownRefreshProps;
const _PullDownRefresh: WithInstallType<typeof PullDownRefresh> = withInstall(PullDownRefresh);
export default _PullDownRefresh;
