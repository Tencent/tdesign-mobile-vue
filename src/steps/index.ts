import LocalSteps from './steps.vue';
import LocalStep from './step-item.vue';
import { withInstall, WithInstallType } from '../shared/';

import './style/';

export const Step: WithInstallType<typeof LocalStep> = withInstall(LocalStep);
export const Steps: WithInstallType<typeof LocalSteps> = withInstall(LocalSteps);
