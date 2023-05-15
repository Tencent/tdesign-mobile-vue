import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { UserIcon } from 'tdesign-icons-vue-next';
import Avatar from '../avatar.vue';
import AvatarGroup from '../avatar-group.vue';
import Badge from '../../badge/badge.vue';

const IMAGE = 'https://tdesign.gtimg.com/site/avatar.jpg';
const IMAGE_FAIL = 'https://tdesign.gtimg.com/mobile/demos/avatar_11112233.png';
const userIconFunc = () => h(UserIcon);

const shapeList = ['circle', 'round'];
const sizeList = ['small', 'medium', 'large'];

describe('avatar', () => {
  describe('props', async () => {
    it(': icon', async () => {
      const wrapper = mount(() => <Avatar icon={userIconFunc} />);
      expect(wrapper.findComponent(UserIcon).exists()).toBeTruthy();
    });

    it(': text', async () => {
      const wrapper = mount(() => <Avatar>A</Avatar>);
      const span = wrapper.find('.t-avatar > span');
      expect(span.exists()).toBeTruthy();
      expect(span.text()).toBe('A');
    });

    it(': shape', async () => {
      shapeList.forEach((s) => {
        const wrapper = mount(() => <Avatar image={IMAGE} shape={s}></Avatar>);
        const shape = wrapper.find(`.t-avatar--${s}`);
        expect(shape.exists()).toBeTruthy();
      });
    });

    it(': size', async () => {
      sizeList.forEach((s) => {
        const wrapper = mount(() => <Avatar image={IMAGE} size={s}></Avatar>);
        const size = wrapper.find(`.t-avatar--${s}`);
        expect(size.exists()).toBeTruthy();
      });
    });

    it(': badge', async () => {
      const wrapper = mount(() => <Avatar image={IMAGE} badgeProps={{ count: 10 }}></Avatar>);
      expect(wrapper.findComponent(Badge).exists()).toBeTruthy();
      const badge = wrapper.find('.t-badge > .t-badge--basic');
      expect(badge.exists()).toBeTruthy();
      expect(badge.text()).toBe('10');
    });

    it(': error', async () => {
      const onError = vi.fn();
      const wrapper = mount(() => <Avatar image={IMAGE_FAIL} alt="加载错误" onError={onError} />);
      const img = wrapper.find('img');
      const status = wrapper.find(`.t-image__mask`);
      expect(status.exists()).toBeTruthy();
      expect(img.exists()).toBeTruthy();
      await img.trigger('error');
      expect(onError).toBeCalledTimes(1);
    });
  });

  describe('slots', async () => {
    it(': icon ', async () => {
      const wrapper = mount(Avatar, {
        slots: {
          icon: userIconFunc,
        },
      });
      const icon = wrapper.find('.t-avatar > .t-avatar__icon');
      expect(icon.exists()).toBeTruthy();
      expect(wrapper.findComponent(UserIcon).exists()).toBeTruthy();
    });
  });
});

describe('avatar-group', async () => {
  it(': create', async () => {
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

  it(': cascading', async () => {
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

  it(': max', async () => {
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
