import Popup from './popup.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdPopupProps } from './type';

import './style';

export * from './type';
export type PopupProps = TdPopupProps;

const _Popup: WithInstallType<typeof Popup> = withInstall(Popup);
export default _Popup;
