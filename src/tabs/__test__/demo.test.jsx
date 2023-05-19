/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import badgeVue from '@/tabs/demos/badge.vue';
import contentVue from '@/tabs/demos/content.vue';
import evenlyVue from '@/tabs/demos/evenly.vue';
import iconVue from '@/tabs/demos/icon.vue';
import isometricVue from '@/tabs/demos/isometric.vue';
import mobileVue from '@/tabs/demos/mobile.vue';
import sizeVue from '@/tabs/demos/size.vue';
import statusVue from '@/tabs/demos/status.vue';
import themeVue from '@/tabs/demos/theme.vue';

const mapper = {
  badgeVue,
  contentVue,
  evenlyVue,
  iconVue,
  isometricVue,
  mobileVue,
  sizeVue,
  statusVue,
  themeVue,
};

describe('Tabs', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Tabs ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
