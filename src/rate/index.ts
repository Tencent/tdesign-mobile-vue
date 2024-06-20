import _Rate from './rate';
import { withInstall, WithInstallType } from '../shared';
import { TdRateProps } from './type';

import './style';

export * from './type';
export type RateProps = TdRateProps;

export const Rate: WithInstallType<typeof _Rate> = withInstall(_Rate);
export default Rate;
