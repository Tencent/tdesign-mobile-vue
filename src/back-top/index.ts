import BackTop from './back-top';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdBackTopProps } from './type';

export * from './type';
export type BackTopProps = TdBackTopProps;

const _BackTop: WithInstallType<typeof BackTop> = withInstall(BackTop);
export default _BackTop;
