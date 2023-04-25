import ActionSheet from './action-sheet.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdActionSheetProps } from './type';

export * from './type';
export type ActionSheetProps = TdActionSheetProps;

const _ActionSheet: WithInstallType<typeof ActionSheet> = withInstall(ActionSheet);
export default _ActionSheet;
