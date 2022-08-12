import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { UserAddIcon } from 'tdesign-icons-vue-next';
import Avatar from '../avatar.vue';
import AvatarGroup from '../avatar-group.vue';

const IMAGE = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';
const imageList = [
  'https://tdesign.gtimg.com/mobile/demos/avatar_1.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_2.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_3.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_4.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_5.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_1.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_2.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_3.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_4.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_5.png',
];
const userAddIcon = () => h(UserAddIcon);

describe('AvatarGroup.vue', async () => {
  it('create', async () => {
    const wrapper = mount(() => (
      <AvatarGroup>
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
      </AvatarGroup>
    ));
    expect(wrapper.classes()).toContain('t-avatar-group');
    expect(wrapper.classes()).toContain('t-avatar--offset-right');
    const avatarList = wrapper.findAll('.t-avatar');
    expect(avatarList.length).toBe(2);
    expect(avatarList[0].classes()).toContain('t-avatar');
    expect(avatarList[1].classes()).toContain('t-avatar');
  });

  it('cascading render', async () => {
    const wrapper = mount(() => (
      <AvatarGroup cascading="left-up">
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
      </AvatarGroup>
    ));
    expect(wrapper.classes()).toContain('t-avatar--offset-left');
  });
});
