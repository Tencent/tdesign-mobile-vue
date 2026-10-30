import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { UserIcon } from 'tdesign-icons-vue-next';
import Avatar from '../avatar';
import type { TdAvatarProps } from '../type';
import Badge from '../../badge/badge';

const IMAGE = 'https://tdesign.gtimg.com/site/avatar.jpg';
const IMAGE_FAIL = 'https://tdesign.gtimg.com/mobile/demos/avatar_11112233.png';
const userIconFunc = () => h(UserIcon);

const shapeList: TdAvatarProps['shape'][] = ['circle', 'round'];
const sizeList = ['small', 'medium', 'large'];

describe('Avatar', () => {
  describe('props', () => {
    it('icon[function]', async () => {
      const wrapper = mount(() => <Avatar icon={userIconFunc} />);
      expect(wrapper.findComponent(UserIcon).exists()).toBeTruthy();
    });

    it('shape[circle/round]', async () => {
      shapeList.forEach((s) => {
        const wrapper = mount(() => <Avatar image={IMAGE} shape={s}></Avatar>);
        const shape = wrapper.find(`.t-avatar--${s}`);
        expect(shape.exists()).toBeTruthy();
      });
    });

    it('size[string]', async () => {
      sizeList.forEach((s) => {
        const wrapper = mount(() => <Avatar image={IMAGE} size={s}></Avatar>);
        const size = wrapper.find(`.t-avatar--${s}`);
        expect(size.exists()).toBeTruthy();
      });
    });

    it('badgeProps[object]', async () => {
      const wrapper = mount(() => <Avatar image={IMAGE} badgeProps={{ count: 10 }}></Avatar>);
      expect(wrapper.findComponent(Badge).exists()).toBeTruthy();
      const badge = wrapper.find('.t-badge > .t-badge--basic');
      expect(badge.exists()).toBeTruthy();
      expect(badge.text()).toBe('10');
    });

    it('imageProps[object]', async () => {
      const wrapper = mount(() => <Avatar image={IMAGE} imageProps={{ alt: '头像' }} />);
      expect(wrapper.find('img').attributes('alt')).toBe('头像');
    });

    it('hideOnLoadFailed[boolean]', async () => {
      // hideOnLoadFailed 开启时不渲染图片，改为图标/文本兜底
      const wrapper = mount(() => <Avatar image={IMAGE} hideOnLoadFailed />);
      expect(wrapper.find('img').exists()).toBeFalsy();

      const wrapper2 = mount(() => <Avatar image={IMAGE} />);
      expect(wrapper2.find('img').exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('error', async () => {
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

  describe('slots', () => {
    it('default', async () => {
      const wrapper = mount(() => <Avatar>A</Avatar>);
      const characterAvatar = wrapper.find('.t-avatar');
      expect(characterAvatar.text()).toBe('A');
    });

    it('icon', async () => {
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
