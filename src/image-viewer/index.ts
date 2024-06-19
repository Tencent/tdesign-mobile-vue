import { withInstall, WithInstallType } from '../shared';
import ImageViewer from './image-viewer';
import './style';

export * from './type';

const _ImageViewer: WithInstallType<typeof ImageViewer> = withInstall(ImageViewer);
export default _ImageViewer;
