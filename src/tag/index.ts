import LocalTag from './tag.vue';
import _LocalCheckTag from './check-tag.vue';
import { withInstall, WithInstallType, mapProps } from '../shared/';

import './style/';

const LocalCheckTag = mapProps([{
  name: 'checked', event: 'change',
}])(_LocalCheckTag)

export const Tag: WithInstallType<typeof LocalTag> = withInstall(LocalTag);
export const CheckTag: WithInstallType<typeof LocalCheckTag> = withInstall(LocalCheckTag);
