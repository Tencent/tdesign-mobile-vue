import Popover from './popover';
import { withInstall, WithInstallType } from '../shared';
import { TdPopoverProps } from './type';

import './style';

export * from './type';
export type PopoverProps = TdPopoverProps;

const _Popover: WithInstallType<typeof Popover> = withInstall(Popover);
export default _Popover;
