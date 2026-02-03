import _Picker from './picker';
import _Cascade from './cascade.vue';
import { withInstall } from '../shared';

import './style';

import { TdPickerProps } from './type';

export * from './type';
export type PickerProps = TdPickerProps;
export const Picker = withInstall(_Picker);
export const Cascade = withInstall(_Cascade);
export default Picker;
