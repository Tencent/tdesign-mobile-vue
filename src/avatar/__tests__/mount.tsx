import { mount } from '@vue/test-utils';
import Avatar from '../avatar';
import AvatarGroup from '../avatar-group';
import type { TdAvatarGroupProps } from '../type';

export const IMAGE = 'https://tdesign.gtimg.com/site/avatar.jpg';
export const IMAGE_FAIL = 'https://tdesign.gtimg.com/mobile/demos/avatar_11112233.png';
export const shapeList = ['circle', 'round'] as const;
export const sizeList = ['small', 'medium', 'large'] as const;

export const mountAvatarGroup = (props: TdAvatarGroupProps = {}, avatarCount = 2) =>
  mount(() => (
    <AvatarGroup {...props}>
      {Array.from({ length: avatarCount }, (_, index) => (
        <Avatar key={index} image={IMAGE} />
      ))}
    </AvatarGroup>
  ));
