import { withInstall, WithInstallType } from '../shared';
import _Watermark from './watermark';

import './style';

import { TdWatermarkProps } from './type';

export * from './type';

export type WatermarkProps = TdWatermarkProps;

export const Watermark: WithInstallType<typeof _Watermark> = withInstall(_Watermark);

export default Watermark;
