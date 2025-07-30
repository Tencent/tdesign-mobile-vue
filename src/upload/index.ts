import { withInstall, WithInstallType } from '../shared';
import _Upload from './upload';

import './style';

import { TdUploadProps } from './type';

export * from './type';
export type UploadProps = TdUploadProps;

export const Upload: WithInstallType<typeof _Upload> = withInstall(_Upload);
export default Upload;
