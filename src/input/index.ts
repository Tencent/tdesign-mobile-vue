import { withInstall } from '../shared';
import _Input from './input';

import './style';
import { TdInputProps } from './type';

export * from './type';
export type InputProps = TdInputProps;

export const Input = withInstall(_Input);
export default Input;
