import _CheckBox from './checkbox.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdCheckboxProps, TdCheckboxGroupProps } from './type';

export * from './type';
export type CheckboxProps = TdCheckboxProps;
export type CheckboxGroupProps = TdCheckboxGroupProps;

const CheckBox: WithInstallType<typeof _CheckBox> = withInstall(_CheckBox);
export default CheckBox;
