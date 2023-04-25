import _CountDown from './count-down.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdCountDownProps } from './type';

import './style';

export * from './type';
export type CountDownProps = TdCountDownProps;

export const CountDown: WithInstallType<typeof _CountDown> = withInstall(_CountDown);
