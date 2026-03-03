import _NoticeBar from './notice-bar';
import { withInstall } from '../shared';

import './style';
import { TdNoticeBarProps } from './type';

export * from './type';
export type NoticeBarProps = TdNoticeBarProps;

export const NoticeBar = withInstall(_NoticeBar);
export default NoticeBar;
