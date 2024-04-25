import { withInstall, WithInstallType } from '../shared';
import Input from './input';

import './style';
import { TdInputProps } from './type';

export * from './type';
export type InputProps = TdInputProps;

const _Input: WithInstallType<typeof Input> = withInstall(Input);
export default _Input;
