import LocalTag from './tag.vue';
import _LocalCheckTag from './check-tag.vue';
import { withInstall, WithInstallType } from '../shared/';
import mapProps from '../shared/map-props';

import './style/';

const LocalCheckTag = mapProps([{
  name: 'checked', event: 'change',
}])(_LocalCheckTag)

export const Tag: WithInstallType<typeof LocalTag> = withInstall(LocalTag);
export const CheckTag: WithInstallType<typeof LocalCheckTag> = withInstall(LocalCheckTag);
