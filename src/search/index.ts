import Search from './search.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _Search: WithInstallType<typeof Search> = withInstall(Search);
export default _Search;
