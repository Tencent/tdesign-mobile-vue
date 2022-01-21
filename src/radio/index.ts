import Radio from './radio.vue';
import { mapProps, withInstall, WithInstallType } from '../shared';

import './style';

const _Radio: WithInstallType<typeof Radio> = withInstall(
  mapProps([
    {
      name: 'checked',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(Radio),
);

export default _Radio;
