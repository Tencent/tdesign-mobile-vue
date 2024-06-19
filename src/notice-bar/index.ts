import NoticeBar from './notice-bar';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdNoticeBarProps } from './type';

export * from './type';
export type NoticeBarProps = TdNoticeBarProps;
const _NoticeBar: WithInstallType<typeof NoticeBar> = withInstall(NoticeBar);
export default _NoticeBar;
