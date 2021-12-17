import LocalPicker from './picker.vue';
import LocalPickerColumn from './picker-column.vue';
import { withInstall, WithInstallType, mapProps } from '../shared';

import './style';

const _LocalPicker = mapProps([
  {
    name: 'value',
    event: 'change',
    alias: ['modelValue'],
  },
])(LocalPicker);

export const Picker: WithInstallType<typeof LocalPicker> = withInstall(_LocalPicker);
export const PickerColumn: WithInstallType<typeof LocalPickerColumn> = withInstall(LocalPickerColumn);
