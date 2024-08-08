import _Row from './row';
import _Col from './col';
import { withInstall, WithInstallType } from '../shared';
import { TdRowProps, TdColProps } from './type';

import './style';

export * from './type';

export type RowProps = TdRowProps;
export type ColProps = TdColProps;

export const Row: WithInstallType<typeof _Row> = withInstall(_Row);
export const Col: WithInstallType<typeof _Col> = withInstall(_Col);

export default {
  Row,
  Col,
};
