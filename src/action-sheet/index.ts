import { withInstall, WithInstallType } from '../shared';
import _ActionSheet from './action-sheet';
import { TdActionSheetProps } from './type';

import './style';

export * from './type';
export type ActionSheetProps = TdActionSheetProps;

export const ActionSheet: WithInstallType<typeof _ActionSheet> = withInstall(_ActionSheet);
export default ActionSheet;
