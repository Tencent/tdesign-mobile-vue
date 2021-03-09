import { withInstall } from '../shared/';
import LocalPicker from './picker.vue';
import LocalPickerColumn from './picker-column.vue';

export const Picker = withInstall(LocalPicker);
export const PickerColumn = withInstall(LocalPickerColumn);
