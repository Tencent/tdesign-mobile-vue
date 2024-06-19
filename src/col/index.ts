import _Col from './col';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdColProps } from './type';

export * from './type';
export type ColProps = TdColProps;

export const Col: WithInstallType<typeof _Col> = withInstall(_Col);
export default Col;
