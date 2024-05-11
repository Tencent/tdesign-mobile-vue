import Radio from './radio';
import _RadioGroup from './radio-group';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdRadioProps, TdRadioGroupProps } from './type';

export * from './type';
export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

export const RadioGroup = withInstall(_RadioGroup);

const _Radio: WithInstallType<typeof Radio> = withInstall(Radio);
export default _Radio;
