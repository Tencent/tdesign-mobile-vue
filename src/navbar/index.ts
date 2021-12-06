import Navbar from './navbar.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _Navbar: WithInstallType<typeof Navbar> = withInstall(Navbar);
export default _Navbar;
