import _QRCode from './qrcode';
import { withInstall } from '../shared';
import { TdQRCodeProps } from './type';

import './style';

export type QRCodeProps = TdQRCodeProps;
export * from './type';

export const QRCode = withInstall(_QRCode, 'TQrcode');

export default QRCode;
