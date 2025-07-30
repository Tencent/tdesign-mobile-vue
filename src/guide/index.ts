import _Guide from './guide';
import { withInstall, WithInstallType } from '../shared';
import { TdGuideProps } from './type';

import './style';

export * from './type';
export type GuideProps = TdGuideProps;

export const Guide: WithInstallType<typeof _Guide> = withInstall(_Guide);
export default Guide;
