/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/navbar/demos/base.vue';
import leftIconVue from '@/navbar/demos/left-icon.vue';
import mobileVue from '@/navbar/demos/mobile.vue';
import rightIconVue from '@/navbar/demos/right-icon.vue';

const mapper = {
  baseVue,
  leftIconVue,
  mobileVue,
  rightIconVue,
};

describe('Navbar', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Navbar ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
