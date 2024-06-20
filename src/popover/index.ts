import _Popover from './popover';
import { withInstall, WithInstallType } from '../shared';
import { TdPopoverProps } from './type';

import './style';

export * from './type';
export type PopoverProps = TdPopoverProps;

export const Popover: WithInstallType<typeof _Popover> = withInstall(_Popover);
export default Popover;
