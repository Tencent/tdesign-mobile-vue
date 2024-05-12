import Row from './row';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdRowProps } from './type';

export * from './type';
export type RowProps = TdRowProps;

const _Row: WithInstallType<typeof Row> = withInstall(Row);
export default _Row;
