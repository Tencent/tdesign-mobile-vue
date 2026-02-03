import _PullDownRefresh from './pull-down-refresh';
import { withInstall } from '../shared';

import './style';
import { TdPullDownRefreshProps } from './type';

export * from './type';
export type PullDownRefreshProps = TdPullDownRefreshProps;

export const PullDownRefresh = withInstall(_PullDownRefresh);
export default PullDownRefresh;
