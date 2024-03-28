import Guide from './guide.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdGuideProps, GuideStep } from './type';

import './style';

export * from './type';
export type GuideProps = TdGuideProps;

const _Guide: WithInstallType<typeof Guide> = withInstall(Guide);
export default _Guide;
