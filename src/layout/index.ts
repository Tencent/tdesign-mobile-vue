import _Row from './row';
import _Col from './col';
import { withInstall } from '../shared';
import { TdRowProps, TdColProps } from './type';

import './style';

export * from './type';

export type RowProps = TdRowProps;
export type ColProps = TdColProps;

export const Row = withInstall(_Row);
export const Col = withInstall(_Col);

export default {
  Row,
  Col,
};
