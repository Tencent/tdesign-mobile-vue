import { withInstall, WithInstallType } from '../shared';
import Textarea from './textarea';

import './style';

import { TdTextareaProps } from './type';

export * from './type';
export type TextareaProps = TdTextareaProps;

const _Textarea: WithInstallType<typeof Textarea> = withInstall(Textarea);
export default _Textarea;
