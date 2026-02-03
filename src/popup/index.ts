import _Popup from './popup';
import { withInstall } from '../shared';
import { TdPopupProps } from './type';

import './style';

export * from './type';
export type PopupProps = TdPopupProps;

export const Popup = withInstall(_Popup);
export default Popup;
