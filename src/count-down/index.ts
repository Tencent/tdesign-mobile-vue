import _CountDown from './count-down';
import { withInstall } from '../shared';

import './style';
import { TdCountDownProps } from './type';

export * from './type';
export type CountDownProps = TdCountDownProps;

export const CountDown = withInstall(_CountDown);
export default CountDown;
