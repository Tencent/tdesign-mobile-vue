import _Calendar from './calendar';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdCalendarProps } from './type';

export * from './type';
export type CalendarProps = TdCalendarProps;

export const Calendar: WithInstallType<typeof _Calendar> = withInstall(_Calendar);
export default Calendar;
