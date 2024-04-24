import DateTimePicker from './date-time-picker';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdDateTimePickerProps } from './type';

export * from './type';
export type DateTimePickerProps = TdDateTimePickerProps;

export const _DateTimePicker: WithInstallType<typeof DateTimePicker> = withInstall(DateTimePicker);
export default _DateTimePicker;
