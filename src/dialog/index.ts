// import { withInstall, WithInstallType } from '../shared';
import _Dialog from './dialog';

import './style';

import { TdDialogProps } from './type';

export * from './type';
export type DialogProps = TdDialogProps;

export { DialogPlugin } from './plugin';

// Dialog 与 Plugin 名称冲突，暂不导出
// export const Dialog: WithInstallType<typeof _Dialog> = withInstall(_Dialog);
// export default Dialog;
