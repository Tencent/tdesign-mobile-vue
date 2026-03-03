import _ColorPicker from './color-picker';
import { withInstall } from '../shared';

import './style';

import { TdColorPickerProps } from './type';

export * from './type';
export type ColorPickerProps = TdColorPickerProps;

export const ColorPicker = withInstall(_ColorPicker);
export default ColorPicker;
