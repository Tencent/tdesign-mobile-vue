import _Rate from './rate';
import { withInstall } from '../shared';
import { TdRateProps } from './type';

import './style';

export * from './type';
export type RateProps = TdRateProps;

export const Rate = withInstall(_Rate);
export default Rate;
