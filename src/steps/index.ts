import LocalSteps from './steps';
import LocalStepItem from './step-item';
import { withInstall, WithInstallType } from '../shared';
import { TdStepsProps, TdStepItemProps } from './type';

import './style';

export * from './type';
export type StepItemProps = TdStepItemProps;
export type StepsProps = TdStepsProps;

export const StepItem: WithInstallType<typeof LocalStepItem> = withInstall(LocalStepItem);
export const Steps: WithInstallType<typeof LocalSteps> = withInstall(LocalSteps);
