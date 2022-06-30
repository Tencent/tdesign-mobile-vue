import _Picker from './picker.vue';
import _Cascade from './cascade.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdPickerProps } from './type';

export * from './type';
export type PickerProps = TdPickerProps;
export const Picker: WithInstallType<typeof _Picker> = withInstall(_Picker);
export const Cascade: WithInstallType<typeof _Cascade> = withInstall(_Cascade);
