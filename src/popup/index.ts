import Popup from './popup.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _Popup: WithInstallType<typeof Popup> = withInstall(Popup);
export default _Popup;
