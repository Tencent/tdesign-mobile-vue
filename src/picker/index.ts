import LocalPicker from './picker.vue';
import LocalPickerItem from './picker-item.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

export const Picker: WithInstallType<typeof LocalPicker> = withInstall(LocalPicker);
export const PickerItem: WithInstallType<typeof LocalPickerItem> = withInstall(LocalPickerItem);
