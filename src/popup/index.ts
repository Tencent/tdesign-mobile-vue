import _Popup from './popup.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdPopupProps } from './type';

import './style';

export * from './type';
export type PopupProps = TdPopupProps;

export const Popup: WithInstallType<typeof _Popup> = withInstall(_Popup);
export default Popup;
