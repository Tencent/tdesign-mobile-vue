import _Sticky from './sticky';
import { withInstall, WithInstallType } from '../shared';
import { TdStickyProps } from './type';

import './style';

export * from './type';
export type StickyProps = TdStickyProps;

export const Sticky: WithInstallType<typeof _Sticky> = withInstall(_Sticky);
export default Sticky;
