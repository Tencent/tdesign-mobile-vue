import LocalTag from './tag.vue';
import LocalCheckTag from './check-tag.vue';
import { withInstall, WithInstallType } from '../shared/';

import './style/';

export const Tag: WithInstallType<typeof LocalTag> = withInstall(LocalTag);
export const CheckTag: WithInstallType<typeof LocalCheckTag> = withInstall(LocalCheckTag);
