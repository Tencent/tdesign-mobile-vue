import LocalSteps from './steps.vue';
import LocalStep from './step-item.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdStepsProps, TdStepItemProps } from './type';

import './style';

export * from './type';
export type StapItemProps = TdStepItemProps;
export type StepsProps = TdStepsProps;

export const Step: WithInstallType<typeof LocalStep> = withInstall(LocalStep);
export const Steps: WithInstallType<typeof LocalSteps> = withInstall(LocalSteps);
