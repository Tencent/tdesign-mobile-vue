import _CheckBox from './checkbox.vue';
import _CheckBoxGroup from './checkbox-group';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdCheckboxProps, TdCheckboxGroupProps } from './type';

export * from './type';
export type CheckboxProps = TdCheckboxProps;
export type CheckboxGroupProps = TdCheckboxGroupProps;

const CheckBox: WithInstallType<typeof _CheckBox> = withInstall(_CheckBox);
export const CheckboxGroup: WithInstallType<typeof _CheckBoxGroup> = withInstall(_CheckBoxGroup);
export default CheckBox;
