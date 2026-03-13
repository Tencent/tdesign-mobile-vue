import _Empty from './empty';
import { withInstall } from '../shared';

import './style';
import { TdEmptyProps } from './type';

export * from './type';
export type EmptyProps = TdEmptyProps;

export const Empty = withInstall(_Empty);
export default Empty;
