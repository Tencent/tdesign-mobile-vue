import { withInstall, WithInstallType } from '../shared';
import _ImageViewer from './image-viewer';

import './style';
import { TdImageViewerProps } from './type';

export * from './type';
export type ImageViewerProps = TdImageViewerProps;

export const ImageViewer: WithInstallType<typeof _ImageViewer> = withInstall(_ImageViewer);
export default ImageViewer;
