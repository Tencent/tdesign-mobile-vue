import Stepper from './stepper.vue';
import { withInstall, WithInstallType } from '../shared/';

import './style/';

const _Stepper: WithInstallType<typeof Stepper> = withInstall(Stepper);
export default _Stepper;
