import CheckGroup from './check-group.vue';
import { withInstall, WithInstallType } from '../shared';

const _CheckGroup: WithInstallType<typeof CheckGroup> = withInstall(CheckGroup);
export default _CheckGroup;
