import _Row from './row';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdRowProps } from './type';

export * from './type';
export type RowProps = TdRowProps;

export const Row: WithInstallType<typeof _Row> = withInstall(_Row);
export default Row;
