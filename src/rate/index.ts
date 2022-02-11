import Rate from './rate.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdRateProps } from './type';

import './style';

export * from './type';
export type RateProps = TdRateProps;

const _Rate: WithInstallType<typeof Rate> = withInstall(Rate);
export default _Rate;
