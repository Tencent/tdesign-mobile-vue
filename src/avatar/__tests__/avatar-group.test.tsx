import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Avatar from '../avatar';
import AvatarGroup from '../avatar-group';

const IMAGE = 'https://tdesign.gtimg.com/site/avatar.jpg';
const sizeList = ['small', 'medium', 'large'];

describe('AvatarGroup', () => {
  describe('props', () => {
    it('size[string]', async () => {
      sizeList.forEach((s) => {
        const wrapper = mount(() => (
          <AvatarGroup size={s}>
            <Avatar image={IMAGE}></Avatar>
            <Avatar image={IMAGE}></Avatar>
          </AvatarGroup>
        ));
        expect(wrapper.classes()).toContain('t-avatar-group');
        expect(wrapper.classes()).toContain(`t-avatar-group-offset-right-${s}`);
        const avatarList = wrapper.findAll('.t-avatar');
        expect(avatarList.length).toBe(2);
        expect(avatarList[0].classes()).toContain('t-avatar');
        expect(avatarList[1].classes()).toContain('t-avatar');
      });
    });

    it('cascading[left-up]', async () => {
      sizeList.forEach((s) => {
        const wrapper = mount(() => (
          <AvatarGroup cascading="left-up" size={s}>
            <Avatar image={IMAGE}></Avatar>
            <Avatar image={IMAGE}></Avatar>
          </AvatarGroup>
        ));
        expect(wrapper.classes()).toContain(`t-avatar-group-offset-left-${s}`);
      });
    });

    it('cascading[default]', async () => {
      sizeList.forEach((s) => {
        const wrapper = mount(() => (
          <AvatarGroup size={s}>
            <Avatar image={IMAGE}></Avatar>
            <Avatar image={IMAGE}></Avatar>
          </AvatarGroup>
        ));
        expect(wrapper.classes()).toContain(`t-avatar-group-offset-right-${s}`);
      });
    });

    it('max[number]', async () => {
      const wrapper = mount(() => (
        <AvatarGroup max={2}>
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
        </AvatarGroup>
      ));
      const avatarList = wrapper.findAllComponents(Avatar);
      expect(avatarList.length).toBe(3);
      expect(avatarList[avatarList.length - 1].text()).toBe('+3');
    });

    it('collapseAvatar', async () => {
      const wrapper = mount(() => (
        <AvatarGroup max={2} v-slots={{ collapseAvatar: () => '更多' }}>
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
        </AvatarGroup>
      ));
      const avatarList = wrapper.findAllComponents(Avatar);
      expect(avatarList[avatarList.length - 1].text()).toBe('更多');
    });
  });
});
