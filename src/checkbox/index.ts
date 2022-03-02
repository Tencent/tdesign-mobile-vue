import _CheckBox from './checkbox.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

export * from './type';

const CheckBox: WithInstallType<typeof _CheckBox> = withInstall(_CheckBox);
export default CheckBox;
