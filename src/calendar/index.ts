import Calendar from './calendar';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdCalendarProps } from './type';

export * from './type';
export type CalendarProps = TdCalendarProps;

const _Calendar: WithInstallType<typeof Calendar> = withInstall(Calendar);
export default _Calendar;
