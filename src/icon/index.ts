import { Icon as _Icon } from 'tdesign-icons-vue-next';
import { withInstall, WithInstallType } from '../shared';

export const Icon: WithInstallType<typeof _Icon> = withInstall(_Icon, 'TIcon');
export default Icon;
