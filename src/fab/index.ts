import _Fab from './fab';
import { withInstall, WithInstallType } from '../shared';

import './style';

export const Fab: WithInstallType<typeof _Fab> = withInstall(_Fab);
export default Fab;
