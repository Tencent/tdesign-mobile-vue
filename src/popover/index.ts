import _Popover from './popover';
import { withInstall } from '../shared';
import { TdPopoverProps } from './type';

import './style';

export * from './type';
export type PopoverProps = TdPopoverProps;

export const Popover = withInstall(_Popover);
export default Popover;
