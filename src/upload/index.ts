import { withInstall, WithInstallType } from '../shared';
import Upload from './upload.vue';
import './style';

const _Upload: WithInstallType<typeof Upload> = withInstall(Upload);
export default _Upload;
