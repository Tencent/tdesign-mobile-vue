/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/side-bar/demos/base.vue';
import customVue from '@/side-bar/demos/custom.vue';
import mobileVue from '@/side-bar/demos/mobile.vue';
import switchVue from '@/side-bar/demos/switch.vue';
import withIconVue from '@/side-bar/demos/with-icon.vue';

const mapper = {
  baseVue,
  customVue,
  mobileVue,
  switchVue,
  withIconVue,
};

describe('SideBar', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`SideBar ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
