import { withInstall, WithInstallType } from '../shared';
import Textarea from './textarea.vue';

import './style';

const _Textarea: WithInstallType<typeof Textarea> = withInstall(Textarea);
export default _Textarea;
