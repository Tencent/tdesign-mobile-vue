import { withInstall, WithInstallType } from '../shared';
import ImageViewer from './image-viewer.vue';

import './style';

const _ImageViewer: WithInstallType<typeof ImageViewer> = withInstall(ImageViewer);
export default _ImageViewer;
