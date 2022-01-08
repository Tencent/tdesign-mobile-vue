import Switch from './switch.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

// export const _Switch: WithInstallType<typeof Switch> = withInstall(
//   mapProps([
//     {
//       name: 'value',
//       event: 'change',
//       alias: ['modelValue'],
//     },
//   ])(Switch),
// );

const _Switch: WithInstallType<typeof Switch> = withInstall(Switch);
export default _Switch;
