import _Button from './button';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdButtonProps } from './type';

export * from './type';
export type ButtonProps = TdButtonProps;

export const Button: WithInstallType<typeof _Button> = withInstall(_Button);
export default Button;
