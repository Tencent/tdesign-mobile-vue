import _Link from './link';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdLinkProps } from './type';

export * from './type';
export type LinkProps = TdLinkProps;

export const Link: WithInstallType<typeof _Link> = withInstall(_Link);
export default Link;
