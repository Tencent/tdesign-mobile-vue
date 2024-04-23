import Empty from './empty';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdEmptyProps } from './type';

export * from './type';
export type EmptyProps = TdEmptyProps;

const _Empty: WithInstallType<typeof Empty> = withInstall(Empty);
export default _Empty;
