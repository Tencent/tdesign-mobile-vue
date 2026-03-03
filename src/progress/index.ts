import { withInstall } from '../shared';
import _Progress from './progress';

import './style';

import { TdProgressProps } from './type';

export * from './type';
export type ProgressProps = TdProgressProps;

export const Progress = withInstall(_Progress);
export default Progress;
