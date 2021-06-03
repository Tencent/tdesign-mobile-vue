import Button from './button.vue';
import { withInstall, WithInstallType } from '../shared/';

import './style/';

const _Button: WithInstallType<typeof Button> = withInstall(Button);
export default _Button;
