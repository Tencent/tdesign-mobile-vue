import _Radio from './radio';
import _RadioGroup from './radio-group';
import { withInstall } from '../shared';

import './style';

import { TdRadioProps, TdRadioGroupProps } from './type';

export * from './type';
export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

export const RadioGroup = withInstall(_RadioGroup);

export const Radio = withInstall(_Radio);
export default Radio;
