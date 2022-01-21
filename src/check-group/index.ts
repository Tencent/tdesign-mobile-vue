import CheckGroup from './check-group.vue';
import { mapProps, withInstall, WithInstallType } from '../shared';

const _CheckGroup: WithInstallType<typeof CheckGroup> = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(CheckGroup),
);
export default _CheckGroup;
