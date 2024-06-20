import { withInstall, WithInstallType } from '../shared';
import _Input from './input';

import './style';
import { TdInputProps } from './type';

export * from './type';
export type InputProps = TdInputProps;

export const Input: WithInstallType<typeof _Input> = withInstall(_Input);
export default Input;
