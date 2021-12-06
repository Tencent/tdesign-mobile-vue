import NoticeBar from './notice-bar.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _NoticeBar: WithInstallType<typeof NoticeBar> = withInstall(NoticeBar);
export default _NoticeBar;
