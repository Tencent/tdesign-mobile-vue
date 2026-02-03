import { withInstall } from '../shared';
import _Upload from './upload';

import './style';

import { TdUploadProps } from './type';

export * from './type';
export type UploadProps = TdUploadProps;

export const Upload = withInstall(_Upload);
export default Upload;
