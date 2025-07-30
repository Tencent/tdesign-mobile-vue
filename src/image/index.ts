import _Image from './image';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdImageProps } from './type';

export * from './type';
export type ImageProps = TdImageProps;

export const Image: WithInstallType<typeof _Image> = withInstall(_Image);
export default Image;
