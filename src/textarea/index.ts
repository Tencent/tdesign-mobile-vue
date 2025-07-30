import { withInstall, WithInstallType } from '../shared';
import _Textarea from './textarea';

import './style';

import { TdTextareaProps } from './type';

export * from './type';
export type TextareaProps = TdTextareaProps;

export const Textarea: WithInstallType<typeof _Textarea> = withInstall(_Textarea);
export default Textarea;
