import _Guide from './guide';
import { withInstall } from '../shared';
import { TdGuideProps } from './type';

import './style';

export * from './type';
export type GuideProps = TdGuideProps;

export const Guide = withInstall(_Guide);
export default Guide;
