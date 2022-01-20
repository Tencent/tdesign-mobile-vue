import Rate from './rate.vue';
import { withInstall, WithInstallType, mapProps } from '../shared';

import './style';

const _Rate: WithInstallType<typeof Rate> = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(Rate),
);

export default _Rate;
