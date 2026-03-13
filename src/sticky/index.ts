import _Sticky from './sticky';
import { withInstall } from '../shared';
import { TdStickyProps } from './type';

import './style';

export * from './type';
export type StickyProps = TdStickyProps;

export const Sticky = withInstall(_Sticky);
export default Sticky;
