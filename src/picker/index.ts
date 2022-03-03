import LocalPicker from './picker.vue';
import LocalPickerItem from './picker-item.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdPickerProps, TdPickerItemProps } from './type';

export * from './type';
export type PickerProps = TdPickerProps;
export type PickerItemProps = TdPickerItemProps;
export const Picker: WithInstallType<typeof LocalPicker> = withInstall(LocalPicker);
export const PickerItem: WithInstallType<typeof LocalPickerItem> = withInstall(LocalPickerItem);
