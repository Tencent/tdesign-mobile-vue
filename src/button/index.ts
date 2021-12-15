import Button from './button.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdButtonProps } from './type';

export * from './type';
export type ButtonProps = TdButtonProps;

const _Button: WithInstallType<typeof Button> = withInstall(Button);
export default _Button;
