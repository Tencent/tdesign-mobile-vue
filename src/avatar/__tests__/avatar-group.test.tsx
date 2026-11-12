import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Avatar from '../avatar';
import AvatarGroup from '../avatar-group';
import { mountAvatarGroup, shapeList, sizeList } from './mount';

describe('AvatarGroup', () => {
  describe('props', () => {
    it.each(['left-up', 'right-up'] as const)('cascading[%s]', (cascading) => {
      const wrapper = mountAvatarGroup({ cascading });
      const direction = cascading === 'left-up' ? 'left' : 'right';
      expect(wrapper.classes()).toContain(`t-avatar-group-offset-${direction}-medium`);
    });

    it('collapseAvatar[string]', () => {
      const wrapper = mountAvatarGroup({ max: 2, collapseAvatar: '更多' }, 3);
      const avatarList = wrapper.findAllComponents(Avatar);
      expect(avatarList[avatarList.length - 1].text()).toBe('更多');
    });

    it('collapseAvatar[function]', () => {
      const wrapper = mountAvatarGroup(
        { max: 2, collapseAvatar: () => <span class="custom-collapse">查看更多</span> },
        3,
      );
      expect(wrapper.find('.custom-collapse').text()).toBe('查看更多');
    });

    it('max[number]', () => {
      const wrapper = mountAvatarGroup({ max: 2 }, 5);
      const avatarList = wrapper.findAllComponents(Avatar);
      expect(avatarList.length).toBe(3);
      expect(avatarList[avatarList.length - 1].text()).toBe('+3');
    });

    it.each(shapeList)('shape[%s]', (shape) => {
      const wrapper = mountAvatarGroup({ shape });
      const avatarList = wrapper.findAll('.t-avatar');
      expect(avatarList).toHaveLength(2);
      avatarList.forEach((avatar) => {
        expect(avatar.classes()).toContain(`t-avatar--${shape}`);
      });
    });

    it.each(sizeList)('size[%s]', (size) => {
      const wrapper = mountAvatarGroup({ size });
      expect(wrapper.classes()).toContain('t-avatar-group');
      expect(wrapper.classes()).toContain(`t-avatar-group-offset-right-${size}`);
      const avatars = wrapper.findAll('.t-avatar');
      expect(avatars).toHaveLength(2);
      avatars.forEach((avatar) => {
        expect(avatar.classes()).toContain(`t-avatar--${size}`);
      });
    });
  });

  describe('events', () => {
    it('collapsedItemClick', async () => {
      const onCollapsedItemClick = vi.fn();
      const wrapper = mountAvatarGroup({ max: 1, onCollapsedItemClick }, 2);

      await wrapper.find('.t-avatar-group__collapse--default').trigger('click');

      expect(onCollapsedItemClick).toHaveBeenCalledTimes(1);
      expect(onCollapsedItemClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });
  });
});
