import _Steps from './steps';
import _StepItem from './step-item';
import { withInstall } from '../shared';
import { TdStepsProps, TdStepItemProps } from './type';

import './style';

export * from './type';
export type StepItemProps = TdStepItemProps;
export type StepsProps = TdStepsProps;

export const StepItem = withInstall(_StepItem);
export const Steps = withInstall(_Steps);
export default Steps;
