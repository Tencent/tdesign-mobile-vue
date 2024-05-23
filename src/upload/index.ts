import { withInstall, WithInstallType } from '../shared';
import Upload from './upload';
import './style';

const _Upload: WithInstallType<typeof Upload> = withInstall(Upload);
export default _Upload;
