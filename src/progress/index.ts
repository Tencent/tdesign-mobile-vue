import { withInstall, WithInstallType } from '../shared';
import Progress from './progress';

import './style';

import { TdProgressProps } from './type';

export * from './type';
export type ProgressProps = TdProgressProps;

const _Progress: WithInstallType<typeof Progress> = withInstall(Progress);
export default _Progress;
