import Sticky from './sticky.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdStickyProps } from './type';

import './style';

export * from './type';
export type StickyProps = TdStickyProps;

const _Sticky: WithInstallType<typeof Sticky> = withInstall(Sticky);
export default _Sticky;
