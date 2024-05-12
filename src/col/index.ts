import Col from './col';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdColProps } from './type';

export * from './type';
export type ColProps = TdColProps;

const _Col: WithInstallType<typeof Col> = withInstall(Col);
export default _Col;
