import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Avatar from '../avatar.vue';
import AvatarGroup from '../avatar-group.vue';

const IMAGE = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';

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

  it('max render', async () => {
    const wrapper = mount(() => (
      <AvatarGroup max={1}>
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
      </AvatarGroup>
    ));
    const avatarList = wrapper.findAllComponents(Avatar);
    expect(avatarList.length).toBe(1);
  });
});
