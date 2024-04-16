import Footer from './footer';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdFooterProps } from './type';

export * from './type';
export type ButtonProps = TdFooterProps;

const _Footer: WithInstallType<typeof Footer> = withInstall(Footer);
export default _Footer;
