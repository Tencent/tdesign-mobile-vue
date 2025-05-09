import _ColorPicker from './color-picker';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdColorPickerProps } from './type';

export * from './type';
export type ColorPickerProps = TdColorPickerProps;

export const ColorPicker: WithInstallType<typeof _ColorPicker> = withInstall(_ColorPicker);
export default ColorPicker;
