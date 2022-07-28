import Result from './result.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdResultProps } from './type';

export * from './type';
export type ResultProps = TdResultProps;
const _Result: WithInstallType<typeof Result> = withInstall(Result);
export default _Result;
