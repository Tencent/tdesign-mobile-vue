import _Steps from './steps';
import _StepItem from './step-item';
import { withInstall, WithInstallType } from '../shared';
import { TdStepsProps, TdStepItemProps } from './type';

import './style';

export * from './type';
export type StepItemProps = TdStepItemProps;
export type StepsProps = TdStepsProps;

export const StepItem: WithInstallType<typeof _StepItem> = withInstall(_StepItem);
export const Steps: WithInstallType<typeof _Steps> = withInstall(_Steps);
export default Steps;
