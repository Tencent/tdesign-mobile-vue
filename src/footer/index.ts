import _Footer from './footer';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdFooterProps } from './type';

export * from './type';
export type FooterProps = TdFooterProps;

export const Footer: WithInstallType<typeof _Footer> = withInstall(_Footer);
export default Footer;
