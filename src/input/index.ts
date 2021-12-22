import { mapProps, withInstall, WithInstallType } from '../shared';
import Input from './input.vue';

import './style';

const _Input: WithInstallType<typeof Input> = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(Input),
);
export default _Input;
