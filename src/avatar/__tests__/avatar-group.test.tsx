import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Avatar from '../avatar';
import AvatarGroup from '../avatar-group';

const IMAGE = 'https://tdesign.gtimg.com/site/avatar.jpg';
const sizeList = ['small', 'medium', 'large'];
const shapeList = ['circle', 'round'];

describe('AvatarGroup', () => {
  describe('props', () => {
    it('cascading[left-up/right-up]', () => {
      (['left-up', 'right-up'] as const).forEach((cascading) => {
        const wrapper = mount(() => (
          <AvatarGroup cascading={cascading}>
            <Avatar image={IMAGE}></Avatar>
            <Avatar image={IMAGE}></Avatar>
          </AvatarGroup>
        ));
        const direction = cascading === 'left-up' ? 'left' : 'right';
        expect(wrapper.classes()).toContain(`t-avatar-group-offset-${direction}-medium`);
      });
    });

    it('collapseAvatar[string]', () => {
      const wrapper = mount(() => (
        <AvatarGroup max={2} collapseAvatar="更多">
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
        </AvatarGroup>
      ));
      const avatarList = wrapper.findAllComponents(Avatar);
      expect(avatarList[avatarList.length - 1].text()).toBe('更多');
    });

    it('collapseAvatar[function]', () => {
      const wrapper = mount(() => (
        <AvatarGroup max={2} collapseAvatar={() => <span class="custom-collapse">查看更多</span>}>
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
        </AvatarGroup>
      ));
      expect(wrapper.find('.custom-collapse').text()).toBe('查看更多');
    });

    it('max[number]', () => {
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

    it('shape[circle/round]', () => {
      shapeList.forEach((s) => {
        const wrapper = mount(() => (
          <AvatarGroup shape={s}>
            <Avatar image={IMAGE}></Avatar>
            <Avatar image={IMAGE}></Avatar>
          </AvatarGroup>
        ));
        const avatarList = wrapper.findAll('.t-avatar');
        expect(avatarList).toHaveLength(2);
        // 分组未单独设置 shape 时，子头像形状由 AvatarGroup.shape 决定
        avatarList.forEach((avatar) => {
          expect(avatar.classes()).toContain(`t-avatar--${s}`);
        });
      });
    });

    it('size[string]', () => {
      sizeList.forEach((s) => {
        const wrapper = mount(() => (
          <AvatarGroup size={s}>
            <Avatar image={IMAGE}></Avatar>
            <Avatar image={IMAGE}></Avatar>
          </AvatarGroup>
        ));
        expect(wrapper.classes()).toContain('t-avatar-group');
        expect(wrapper.classes()).toContain(`t-avatar-group-offset-right-${s}`);
        expect(wrapper.findAll('.t-avatar')).toHaveLength(2);
      });
    });
  });

  describe('events', () => {
    it('collapsedItemClick', async () => {
      const onCollapsedItemClick = vi.fn();
      const wrapper = mount(() => (
        <AvatarGroup max={1} onCollapsedItemClick={onCollapsedItemClick}>
          <Avatar image={IMAGE}></Avatar>
          <Avatar image={IMAGE}></Avatar>
        </AvatarGroup>
      ));

      await wrapper.find('.t-avatar-group__collapse--default').trigger('click');

      expect(onCollapsedItemClick).toHaveBeenCalledTimes(1);
      expect(onCollapsedItemClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });
  });
});
