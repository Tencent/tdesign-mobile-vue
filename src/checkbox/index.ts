import _Checkbox from './checkbox';
import _CheckboxGroup from './checkbox-group';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdCheckboxProps, TdCheckboxGroupProps } from './type';

export * from './type';
export type CheckboxProps = TdCheckboxProps;
export type CheckboxGroupProps = TdCheckboxGroupProps;

export const Checkbox: WithInstallType<typeof _Checkbox> = withInstall(_Checkbox);
export const CheckboxGroup: WithInstallType<typeof _CheckboxGroup> = withInstall(_CheckboxGroup);
export default Checkbox;
