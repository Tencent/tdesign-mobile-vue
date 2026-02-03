import _Link from './link';
import { withInstall } from '../shared';

import './style';
import { TdLinkProps } from './type';

export * from './type';
export type LinkProps = TdLinkProps;

export const Link = withInstall(_Link);
export default Link;
