import Switch from './switch';
import { withInstall, WithInstallType } from '../shared';
import { TdSwitchProps } from './type';

import './style';

export * from './type';
export type SwitchProps = TdSwitchProps;

const _Switch: WithInstallType<typeof Switch> = withInstall(Switch);
export default _Switch;
