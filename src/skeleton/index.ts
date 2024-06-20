import _Skeleton from './skeleton';
import { withInstall, WithInstallType } from '../shared';

import { TdSkeletonProps } from './type';
import './style';

export * from './type';
export type SkeletonProps = TdSkeletonProps;

export const Skeleton: WithInstallType<typeof _Skeleton> = withInstall(_Skeleton);
export default Skeleton;
