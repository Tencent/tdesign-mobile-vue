import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { UserIcon } from 'tdesign-icons-vue-next';
import Avatar from '../avatar.vue';
import AvatarGroup from '../avatar-group.vue';
import Badge from '../../badge/badge.vue';
import { vi } from 'vitest';

const IMAGE = 'https://tdesign.gtimg.com/site/avatar.jpg';
const IMAGE_FAIL = 'https://tdesign.gtimg.com/mobile/demos/avatar_11112233.png';
const userIconFunc = () => h(UserIcon);

const shapeList = ['circle', 'round'];
const sizeList = ['small', 'medium', 'large'];

describe('Avatar.vue', async () => {
  it('create', async () => {
    const wrapper = mount(() => <Avatar image={IMAGE} />);
    expect(wrapper.classes()).toContain('t-avatar');
    const img = wrapper.find('.t-avatar__inner > img');
    expect(img.exists()).toBeTruthy();
    expect(img.attributes('src')).toBe(IMAGE);
  });

  it('icon render', async () => {
    const wrapper = mount(() => <Avatar icon={userIconFunc} />);
    expect(wrapper.findComponent(UserIcon).exists()).toBeTruthy();
  });

  it('text render', async () => {
    const wrapper = mount(() => <Avatar>A</Avatar>);
    const span = wrapper.find('.t-avatar__inner > span');
    expect(span.exists()).toBeTruthy();
    expect(span.text()).toBe('A');
  });

  it('icon slot render', async () => {
    const wrapper = mount(Avatar, {
      slots: {
        icon: userIconFunc,
      },
    });
    const icon = wrapper.find('.t-avatar__inner > .t-avatar__icon');
    expect(icon.exists()).toBeTruthy();
    expect(wrapper.findComponent(UserIcon).exists()).toBeTruthy();
  });

  it('shape render', async () => {
    shapeList.forEach((s) => {
      const wrapper = mount(() => <Avatar image={IMAGE} shape={s}></Avatar>);
      expect(wrapper.classes()).toContain(`t-avatar--${s}`);
    });
  });

  it('size render', async () => {
    sizeList.forEach((s) => {
      const wrapper = mount(() => <Avatar image={IMAGE} size={s}></Avatar>);
      expect(wrapper.classes()).toContain(`t-size-${s?.slice(0, 1)}`);
    });
  });

  it('badge render', async () => {
    const wrapper = mount(() => <Avatar image={IMAGE} badgeProps={{ count: 10 }}></Avatar>);
    expect(wrapper.findComponent(Badge).exists()).toBeTruthy();
    const badge = wrapper.find('.t-badge > .t-badge__inner');
    expect(badge.exists()).toBeTruthy();
    expect(badge.text()).toBe('10');
  });

  it('error render', async () => {
    const onError = vi.fn();
    const wrapper = mount(() => <Avatar image={IMAGE_FAIL} alt="加载错误" onError={onError} />);
    const img = wrapper.find('.t-avatar__inner > img');
    expect(img.attributes('alt')).toBe('加载错误');
    expect(img.exists()).toBeUndefined;
    await nextTick();
    await img.trigger('error');
    expect(onError).toBeCalled();
  });
});

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
