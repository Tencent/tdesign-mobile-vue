import RadioGroup from './radio-group.vue';
import { mapProps, withInstall, WithInstallType } from '../shared';

const _RadioGroup: WithInstallType<typeof RadioGroup> = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(RadioGroup),
);
export default _RadioGroup;
