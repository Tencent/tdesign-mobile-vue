import _DateTimePicker from './date-time-picker';
import { withInstall } from '../shared';

import './style';

import { TdDateTimePickerProps } from './type';

export * from './type';
export type DateTimePickerProps = TdDateTimePickerProps;

export const DateTimePicker = withInstall(_DateTimePicker);
export default DateTimePicker;
