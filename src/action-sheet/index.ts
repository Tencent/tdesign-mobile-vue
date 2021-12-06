import ActionSheet from './action-sheet.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _ActionSheet: WithInstallType<typeof ActionSheet> = withInstall(ActionSheet);
export default _ActionSheet;
