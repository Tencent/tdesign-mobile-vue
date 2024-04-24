import { withInstall, WithInstallType } from '../shared';
import _Overlay from './overlay';

import './style';

const Overlay: WithInstallType<typeof _Overlay> = withInstall(_Overlay);
export default Overlay;
