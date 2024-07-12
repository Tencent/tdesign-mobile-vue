import _BackTop from './back-top';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdBackTopProps } from './type';

export * from './type';
export type BackTopProps = TdBackTopProps;

export const BackTop: WithInstallType<typeof _BackTop> = withInstall(_BackTop);
export default BackTop;
