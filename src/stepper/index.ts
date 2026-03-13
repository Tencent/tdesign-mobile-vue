import _Stepper from './stepper';
import { withInstall } from '../shared';
import { TdStepperProps } from './type';

import './style';

export * from './type';
export type StepperProps = TdStepperProps;

export const Stepper = withInstall(_Stepper);
export default Stepper;
