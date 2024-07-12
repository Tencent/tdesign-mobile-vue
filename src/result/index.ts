import _Result from './result';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdResultProps } from './type';

export * from './type';
export type ResultProps = TdResultProps;

export const Result: WithInstallType<typeof _Result> = withInstall(_Result);
export default Result;
