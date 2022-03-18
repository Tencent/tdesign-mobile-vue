import CheckboxGroup from './checkbox-group.vue';
import { withInstall, WithInstallType } from '../shared';

const _CheckboxGroup: WithInstallType<typeof CheckboxGroup> = withInstall(CheckboxGroup);
export default _CheckboxGroup;
