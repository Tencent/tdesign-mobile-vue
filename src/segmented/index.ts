import _Segmented from './segmented';
import { withInstall } from '../shared';

import './style';
import { TdSegmentedProps } from './type';

export * from './type';
export type SegmentedProps = TdSegmentedProps;

export const Segmented = withInstall(_Segmented);
export default Segmented;
