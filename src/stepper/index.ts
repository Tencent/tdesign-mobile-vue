import _Stepper from './stepper.vue';
import { withInstall, WithInstallType, mapProps } from '../shared';

import './style';

const LocalStepper = mapProps([
  {
    name: 'value',
    event: 'change',
    alias: ['modelValue'],
  },
])(_Stepper);

const Stepper: WithInstallType<typeof LocalStepper> = withInstall(LocalStepper);
export default Stepper;
