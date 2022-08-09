import _Calendar from './calendar.vue';
import { withInstall, WithInstallType } from '../shared';
import './style';
import { TdCalendarProps } from './type';

export * from './type';
export type CalendarProps = TdCalendarProps;

const Calendar: WithInstallType<typeof _Calendar> = withInstall(_Calendar);


export default Calendar;
