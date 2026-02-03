import _QRCode from './qrcode';
import { withInstall, WithInstallType } from '../shared';
import { TdQRCodeProps } from './type';

import './style';

export type QRCodeProps = TdQRCodeProps;
export * from './type';

export const QRCode: WithInstallType<typeof _QRCode> = withInstall(_QRCode, 'TQrcode');

export default QRCode;
