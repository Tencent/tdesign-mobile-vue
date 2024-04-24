import _Overlay from './overlay';
import { withInstall, WithInstallType } from '../shared';

import { TdOverlayProps } from './type';
import './style';

export type OverlayProps = TdOverlayProps;

const Overlay: WithInstallType<typeof _Overlay> = withInstall(_Overlay);
export default Overlay;
