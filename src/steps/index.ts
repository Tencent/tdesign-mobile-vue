import { withInstall } from '../shared/';
import LocalSteps from './steps.vue';
import LocalStep from './step-item.vue';

import './style/';

export const Step = withInstall(LocalStep);
export const Steps = withInstall(LocalSteps);
