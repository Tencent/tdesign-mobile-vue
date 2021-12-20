import LocalPicker from './picker.vue';
import LocalPickerColumn from './picker-column.vue';
import { withInstall, WithInstallType, mapProps } from '../shared';

import './style';

export const Picker: WithInstallType<typeof LocalPicker> = withInstall(LocalPicker);
export const PickerColumn: WithInstallType<typeof LocalPickerColumn> = withInstall(LocalPickerColumn);
