import _DateTimePicker from './date-time-picker';
import { withInstall, WithInstallType } from '../shared';

import './style';

import { TdDateTimePickerProps } from './type';

export * from './type';
export type DateTimePickerProps = TdDateTimePickerProps;

export const DateTimePicker: WithInstallType<typeof _DateTimePicker> = withInstall(_DateTimePicker);
export default DateTimePicker;
