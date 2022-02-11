import DateTimePicker from './date-time-picker.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

export const _DateTimePicker: WithInstallType<typeof DateTimePicker> = withInstall(DateTimePicker);
export default _DateTimePicker;
