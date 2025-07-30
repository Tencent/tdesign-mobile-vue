import { withInstall, WithInstallType } from '../shared';
import _Indexes from './indexes';
import _IndexesAnchor from './indexes-anchor';

import './style';

import { TdIndexesProps, TdIndexesAnchorProps } from './type';

export * from './type';
export type IndexesProps = TdIndexesProps;
export type IndexesAnchorProps = TdIndexesAnchorProps;

export const Indexes: WithInstallType<typeof _Indexes> = withInstall(_Indexes);
export const IndexesAnchor: WithInstallType<typeof _IndexesAnchor> = withInstall(_IndexesAnchor);
export default Indexes;
