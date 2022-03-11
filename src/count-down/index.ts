import _Countdown from './count-down.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdCountDownProps } from './type';

import './style';

export * from './type';
export type CountDownProps = TdCountDownProps;

export const Countdown: WithInstallType<typeof _Countdown> = withInstall(_Countdown);
