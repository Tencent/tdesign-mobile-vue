import Image from './image';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdImageProps } from './type';

export * from './type';
export type ImageProps = TdImageProps;

const _Image: WithInstallType<typeof Image> = withInstall(Image);
export default _Image;
