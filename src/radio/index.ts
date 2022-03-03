import Radio from './radio.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdRadioProps, TdRadioGroupProps } from './type';

export * from './type';
export type RadioProps = TdRadioProps;
export type RadioGroupProps = TdRadioGroupProps;

const _Radio: WithInstallType<typeof Radio> = withInstall(Radio);
export default _Radio;
