import Skeleton from './skeleton';
import { withInstall, WithInstallType } from '../shared';

import { TdSkeletonProps } from './type';
import './style';

export * from './type';
export type SkeletonProps = TdSkeletonProps;

const _Skeleton: WithInstallType<typeof Skeleton> = withInstall(Skeleton);
export default _Skeleton;
