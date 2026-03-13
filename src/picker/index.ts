import _Picker from './picker';
import { withInstall } from '../shared';

import './style';

import { TdPickerProps } from './type';

export * from './type';
export type PickerProps = TdPickerProps;
export const Picker = withInstall(_Picker);
export default Picker;
