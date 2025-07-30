import _Stepper from './stepper';
import { withInstall, WithInstallType } from '../shared';
import { TdStepperProps } from './type';

import './style';

export * from './type';
export type StepperProps = TdStepperProps;

export const Stepper: WithInstallType<typeof _Stepper> = withInstall(_Stepper);
export default Stepper;
