import { withInstall, WithInstallType } from '../shared';
import Input from './input.vue';

import './style';

const _Input: WithInstallType<typeof Input> = withInstall(Input);
export default _Input;
