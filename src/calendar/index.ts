import _Calendar from './calendar';
import { withInstall } from '../shared';

import './style';
import { TdCalendarProps } from './type';

export * from './type';
export type CalendarProps = TdCalendarProps;

export const Calendar = withInstall(_Calendar);
export default Calendar;
