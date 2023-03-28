import { withInstall, WithInstallType } from '../shared';
import Overlay from './overlay.vue';

import './style';
import { TdOverlayProps } from './type';

export * from './type';
export type OverlayProps = TdOverlayProps;

const _Overlay: WithInstallType<typeof Overlay> = withInstall(Overlay);
export default _Overlay;
