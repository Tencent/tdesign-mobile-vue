import _Loading from './loading';
import { withInstall } from '../shared';

import { TdLoadingProps } from './type';
import './style';

export * from './type';
export * from './plugin';
export { default as LoadingPlugin } from './plugin';

export type LoadingProps = TdLoadingProps;

export const Loading = withInstall(_Loading);
export default Loading;
