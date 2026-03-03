import { withInstall } from '../shared';
import _Indexes from './indexes';
import _IndexesAnchor from './indexes-anchor';

import './style';

import { TdIndexesProps, TdIndexesAnchorProps } from './type';

export * from './type';
export type IndexesProps = TdIndexesProps;
export type IndexesAnchorProps = TdIndexesAnchorProps;

export const Indexes = withInstall(_Indexes);
export const IndexesAnchor = withInstall(_IndexesAnchor);
export default Indexes;
