import _Overlay from './overlay';
import { withInstall } from '../shared';

import { TdOverlayProps } from './type';
import './style';

export type OverlayProps = TdOverlayProps;

export const Overlay = withInstall(_Overlay);
export default Overlay;
