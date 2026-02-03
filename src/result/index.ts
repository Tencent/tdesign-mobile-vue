import _Result from './result';
import { withInstall } from '../shared';

import './style';
import { TdResultProps } from './type';

export * from './type';
export type ResultProps = TdResultProps;

export const Result = withInstall(_Result);
export default Result;
