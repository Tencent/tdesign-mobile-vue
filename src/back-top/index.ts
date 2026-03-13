import _BackTop from './back-top';
import { withInstall } from '../shared';

import './style';
import { TdBackTopProps } from './type';

export * from './type';
export type BackTopProps = TdBackTopProps;

export const BackTop = withInstall(_BackTop);
export default BackTop;
