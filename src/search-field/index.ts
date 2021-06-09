import SearchField from './search-field.vue';
import { withInstall, WithInstallType } from '../shared/';

import './style/';

const _SearchField: WithInstallType<typeof SearchField> = withInstall(SearchField);
export default _SearchField;
