/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import actionVue from '@/avatar/demos/action.vue';
import badgeAvatarVue from '@/avatar/demos/badge-avatar.vue';
import characterAvatarVue from '@/avatar/demos/character-avatar.vue';
import exhibitionVue from '@/avatar/demos/exhibition.vue';
import iconAvatarVue from '@/avatar/demos/icon-avatar.vue';
import imageAvatarVue from '@/avatar/demos/image-avatar.vue';
import mobileVue from '@/avatar/demos/mobile.vue';
import sizeVue from '@/avatar/demos/size.vue';

const mapper = {
  actionVue,
  badgeAvatarVue,
  characterAvatarVue,
  exhibitionVue,
  iconAvatarVue,
  imageAvatarVue,
  mobileVue,
  sizeVue,
};

describe('Avatar', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Avatar ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
