import _CountDown from './count-down';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdCountDownProps } from './type';

export * from './type';
export type CountDownProps = TdCountDownProps;

export const CountDown: WithInstallType<typeof _CountDown> = withInstall(_CountDown);
export default CountDown;
